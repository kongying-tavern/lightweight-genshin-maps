import {
  DomLayer,
  MarkerEvent,
  MarkerLayer,
  TileLayer,
  Tilemap,
} from "@7c00/canvas-tilemap";
import { proxy } from "valtio";
import { proxySet } from "valtio/utils";
import {
  api,
  Area,
  AreaItem,
  fetchAccessToken,
  ItemType,
  MarkerInfo,
} from "./api";
import { AreaItemMarker } from "./area-item-marker";
import { teyvatMapConfig } from "./maps-config";
import { createMarkerInfoElement } from "./marker-info";
import nonGroundIcon from "../images/icon-non-ground.png";

export let tilemap: Tilemap;
export const markerMap = {} as Record<number, AreaItemMarker>;
let nonGroundMarkerLayer: MarkerLayer;

export const store = proxy({
  accessToken: "",
  topAreaList: [] as Area[],
  areaMap: {} as Record<number, Area>,
  activeTopArea: null as unknown as Area,
  activeSubArea: null as unknown as Area,
  itemTypeMap: {} as Record<number, ItemType>,
  isDrawerOpen: false,
  isAreaPickerOpen: false,
  iconMap: {} as Record<string, string>,
  areaItemMap: {} as Record<number, AreaItem>,
  teleportIdList: [] as number[],
  marked: proxySet<number>(),
  activeAreaItems: proxySet<number>(),
  nonGroundMarkers: proxySet<number>(),
});

export async function init() {
  store.accessToken = await fetchAccessToken();
  initIconMap();
  initItemTypes();
  initAreaList();
}

// 初始化地区列表
async function initAreaList() {
  const cacheKey = "areaList";
  let areaItemsInitialized = false;
  let areaList = [] as Area[];

  // 从缓存加载
  try {
    areaList = JSON.parse(localStorage.getItem(cacheKey)!);
  } catch (_) {}
  updateAreaList(areaList ?? []);
  if (store.activeSubArea) {
    initAreaItems();
    areaItemsInitialized = true;
  }

  areaList = await api("area/get/list", {
    isTraverse: true,
    parentId: -1,
  });
  localStorage.setItem(cacheKey, JSON.stringify(areaList));
  updateAreaList(areaList);
  if (!areaItemsInitialized) {
    initAreaItems();
  }
}

function updateAreaList(areaList: Area[]) {
  if (!areaList.length) return;

  areaList.sort((a, b) => {
    // 为了 parentId = -1 排在前面，不然循环的时候 areaMap[area.parentId] 访问出错
    if (a.parentId - b.parentId > 0) {
      return 1;
    }
    return b.sortIndex - a.sortIndex;
  });

  for (const area of areaList) {
    if (store.areaMap[area.areaId]) continue;

    area.children = [];
    store.areaMap[area.areaId] = area;
    if (area.parentId == -1) {
      store.topAreaList.push(store.areaMap[area.areaId]);
    } else {
      store.areaMap[area.parentId].children.push(store.areaMap[area.areaId]);
    }
  }
  store.activeTopArea = store.topAreaList[3];
  store.activeSubArea = store.activeTopArea.children[0];
}

export function activateArea(areaId: number) {
  if (store.activeSubArea.areaId == areaId) return;

  const subArea = store.areaMap[areaId];
  store.activeTopArea = store.areaMap[subArea.parentId];
  store.activeSubArea = subArea;
  initAreaItems();
}

async function initIconMap() {
  const cacheKey = "icons";
  let iconMap = {};
  try {
    iconMap = JSON.parse(localStorage.getItem(cacheKey)!);
  } catch (_) {}
  store.iconMap = iconMap ?? {};
  const { record } = await api("icon/get/list", { size: 1e3 });
  for (const i of record) {
    store.iconMap[i.name] = i.url;
  }
  localStorage.setItem(cacheKey, JSON.stringify(store.iconMap));
}

async function initItemTypes() {
  const { record } = await api("item_type/get/list/1");
  for (const i of record as ItemType[]) {
    i.items = [];
    store.itemTypeMap[i.typeId] = i;
  }
}

async function initAreaItems() {
  // 先移除之前地区的传送点位
  for (const id of store.teleportIdList) {
    store.activeAreaItems.delete(id);
    markerMap[id]?.removeMarkerLayer();
  }

  const { record } = await api("item/get/list", {
    areaIdList: [store.activeSubArea.areaId],
    size: 1e3,
  });

  store.teleportIdList = [];
  for (const itemType of Object.values(store.itemTypeMap)) {
    itemType.items = [];
  }
  for (const areaItem of record as AreaItem[]) {
    store.areaItemMap[areaItem.itemId] = areaItem;
    for (const typeId of areaItem.typeIdList) {
      const itemType = store.itemTypeMap[typeId];
      if (itemType) {
        itemType.items.push(areaItem);
      } else {
        // TODO: 宝箱特殊处理
      }
    }
    if (areaItem.specialFlag) {
      store.teleportIdList.push(areaItem.itemId);
    }
  }
  activeAreaItems(store.teleportIdList);
}

async function activeAreaItems(areaItems: number[]) {
  const itemIdList = [] as number[];
  for (const itemId of areaItems) {
    const marker = markerMap[itemId];
    if (marker) {
      marker.addMarkerLayer();
    } else {
      itemIdList.push(itemId);
    }
  }

  if (itemIdList.length) {
    fetchMarkerInfo(itemIdList);
  }
}

async function fetchMarkerInfo(itemIdList: number[]) {
  const markersMap = {} as Record<number, MarkerInfo[]>;
  const markers: MarkerInfo[] = await api("marker/get/list_byinfo", {
    itemIdList,
  });

  tilemap.markerLayers.delete(nonGroundMarkerLayer);
  for (const i of markers) {
    if (i.markerExtraContent?.includes("underground")) {
      const [x, y] = i.position.split(",").map((i) => parseFloat(i));
      nonGroundMarkerLayer.options.items.push({ x, y, data: null });
    }
    // TODO: 暂时只处理一个 item
    const item = i.itemList.find((i) => itemIdList.includes(i.itemId))!;
    let items = markersMap[item.itemId];
    if (!items) {
      items = [];
      markersMap[item.itemId] = items;
    }
    items.push(i);
  }

  for (const itemId in markersMap) {
    const marker = new AreaItemMarker(
      store.areaItemMap[itemId],
      markersMap[itemId]
    );
    await marker.initMarkerLayer();
    markerMap[itemId] = marker;
  }
  tilemap.markerLayers.add(nonGroundMarkerLayer);
  tilemap.draw();
}

export function toggleAreaItem(areaItem: AreaItem) {
  const { itemId } = areaItem;
  if (store.activeAreaItems.has(itemId)) {
    store.activeAreaItems.delete(itemId);
    markerMap[itemId].removeMarkerLayer();
  } else {
    store.activeAreaItems.add(itemId);
    activeAreaItems([areaItem.itemId]);
  }
}

function onTilemapClick(event?: MarkerEvent) {
  if (event) {
    const { target, index } = event;
    const { items } = target.options;
    const item = items[index];
    tilemap.domLayers.clear();
    tilemap.domLayers.add(
      new DomLayer(tilemap, {
        element: createMarkerInfoElement(item),
        position: [item.x, item.y],
      })
    );
    tilemap.draw();
  } else {
    tilemap.domLayers.clear();
    tilemap.draw();
  }
  closeAreaPicker();
}

export function initTilemap(element: HTMLElement | null) {
  if (!element) return;

  tilemap = new Tilemap({
    ...teyvatMapConfig,
    element,
    onClick: onTilemapClick,
  });
  tilemap.tileLayers.add(
    new TileLayer(tilemap, {
      minZoom: 10,
      maxZoom: 13,
      getTileUrl: teyvatMapConfig.getTileUrl,
    })
  );
  const nonGroundImage = new Image();
  nonGroundImage.src = nonGroundIcon;
  nonGroundMarkerLayer = new MarkerLayer(tilemap, {
    items: [],
    image: nonGroundImage,
    anchor: [0, 1],
    clickable: false,
  });
  tilemap.markerLayers.add(nonGroundMarkerLayer);
}

export function toggleDrawer() {
  store.isDrawerOpen = !store.isDrawerOpen;
}

export function toggleAreaPicker() {
  store.isAreaPickerOpen = !store.isAreaPickerOpen;
}

export function closeAreaPicker() {
  store.isAreaPickerOpen = false;
}
