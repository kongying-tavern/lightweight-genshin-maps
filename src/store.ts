import {
  DomLayer,
  MarkerEvent,
  MarkerLayer,
  TileLayer,
  Tilemap,
} from "@7c00/canvas-tilemap/src";
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

export let tilemap: Tilemap;
export const markerMap = {} as Record<number, AreaItemMarker>;
let activeMarkerLayer: MarkerLayer;

export const store = proxy({
  accessToken: "",
  topAreaList: [] as Area[],
  areaMap: {} as Record<number, Area>,
  activeTopArea: null as unknown as Area,
  activeSubArea: null as unknown as Area,
  itemTypeMap: {} as Record<number, ItemType>,
  isDrawerOpen: true,
  iconMap: {} as Record<string, string>,
  areaItemMap: {} as Record<number, AreaItem>,
  teleports: [] as AreaItem[],
  marked: proxySet<number>(),
  activeAreaItems: proxySet<number>(),
});

export async function init() {
  store.accessToken = await fetchAccessToken();
  initIconMap();
  initItemTypes();
  initAreaList();
}

async function initAreaList() {
  const cacheKey = "areaList";
  let areaItemsInitialized = false;
  let areaList = [] as Area[];
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
  for (const area of areaList) {
    area.children = [];
    store.areaMap[area.areaId] = area;
    if (area.parentId == -1) {
      store.topAreaList.push(store.areaMap[area.areaId]);
    } else {
      store.areaMap[area.parentId].children.push(store.areaMap[area.areaId]);
    }
  }
  store.activeTopArea = store.topAreaList[0];
  store.activeSubArea = store.activeTopArea.children[0];
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
  store.teleports = [];
  const { record } = await api("item/get/list", {
    areaIdList: [store.activeSubArea.areaId],
    size: 1e3,
  });
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
      store.teleports.push(areaItem);
    }
  }
  activeAreaItems(store.teleports);
}

async function activeAreaItems(areaItems: AreaItem[]) {
  const itemIdList = [] as number[];
  for (const { itemId } of areaItems) {
    const marker = markerMap[itemId];
    if (marker) {
      marker.addMarkerLayer();
    } else {
      itemIdList.push(itemId);
    }
  }

  if (itemIdList.length) {
    fetchAreaItems(itemIdList);
  }
}

async function fetchAreaItems(itemIdList: number[]) {
  const markersMap = {} as Record<number, MarkerInfo[]>;
  const markers: MarkerInfo[] = await api("marker/get/list_byinfo", {
    itemIdList,
  });

  for (const i of markers) {
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
    markerMap[itemId] = marker;
  }
}

export function toggleAreaItem(areaItem: AreaItem) {
  const { itemId } = areaItem;
  if (store.activeAreaItems.has(itemId)) {
    store.activeAreaItems.delete(itemId);
    markerMap[itemId].removeMarkerLayer();
  } else {
    store.activeAreaItems.add(itemId);
    activeAreaItems([areaItem]);
  }
}

function handleTilemapClick(event?: MarkerEvent) {
  if (event) {
    const { target, index } = event;
    if (target == activeMarkerLayer) return;

    const { image, items } = target.options;
    const item = items[index];
    tilemap.markerLayers.add(activeMarkerLayer);
    activeMarkerLayer.options.items[0] = item;
    activeMarkerLayer.options.image = image;

    const markerElement = document.createElement("div");
    markerElement.className = "marker";
    markerElement.innerHTML = `
        <div class="marker-title">${item.data.markerTitle}</div>
        <div class="marker-content">${item.data.content}</div>
        ${item.data.picture ? `<img src="${item.data.picture}">` : ""}
      `;
    tilemap.domLayers.clear();
    tilemap.domLayers.add(
      new DomLayer(tilemap, {
        element: markerElement,
        position: [item.x, item.y],
      })
    );
    tilemap.draw();
  }
}

function createActiveMarkerImage(image: HTMLCanvasElement) {
  const canvas = document.createElement("canvas")!;
  const canvas2d = canvas.getContext("2d")!;
  canvas.width = image.width;
  canvas.height = image.height;
  canvas2d.drawImage(image, 0, 0);
  return canvas;
}

export function initTilemap(element: HTMLElement | null) {
  if (!element) return;

  tilemap = new Tilemap({
    ...teyvatMapConfig,
    element,
    onClick: handleTilemapClick,
  });
  tilemap.tileLayers.add(
    new TileLayer(tilemap, {
      minZoom: 10,
      maxZoom: 13,
      getTileUrl: teyvatMapConfig.getTileUrl,
    })
  );
}

export function toggleDrawer() {
  store.isDrawerOpen = !store.isDrawerOpen;
}
