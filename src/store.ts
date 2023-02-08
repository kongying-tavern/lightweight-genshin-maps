import { TileLayer, Tilemap } from "@7c00/canvas-tilemap/src";
import { proxy } from "valtio";
import {
  api,
  Area,
  AreaItem,
  fetchAccessToken,
  ItemType,
  MarkerInfo,
} from "./api";
import { teyvatMapConfig } from "./maps-config";

let tilemap: Tilemap;
const teleportNames = ["传送锚点", "七天神像", "秘境", "征讨领域"];

class MarkerItem {
  isTeleport = false;
  item: AreaItem;
  markers: MarkerInfo[];

  constructor(item: AreaItem, markers: MarkerInfo[]) {
    this.item = item;
    this.markers = markers;
  }
}

export const store = proxy({
  accessToken: "",
  topAreaList: [] as Area[],
  areaMap: {} as Record<number, Area>,
  activeTopArea: null as unknown as Area,
  activeSubArea: null as unknown as Area,
  itemTypeMap: {} as Record<number, ItemType>,
  isDrawerOpen: true,
  iconMap: {} as Record<string, string>,
  teleports: [] as AreaItem[],
});

export async function init() {
  store.accessToken = await fetchAccessToken();
  initIconMap();
  initItemTypes();
  await initAreaList();
  fetchAreaItems();
}

async function initAreaList() {
  const areaList: Area[] = await api("area/get/list", {
    isTraverse: true,
    parentId: -1,
  });
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
  const { record } = await api("icon/get/list", { size: 1e3 });
  for (const i of record) {
    store.iconMap[i.name] = i.url;
  }
}

async function initItemTypes() {
  const { record } = await api("item_type/get/list/1");
  for (const i of record as ItemType[]) {
    i.items = [];
    store.itemTypeMap[i.typeId] = i;
  }
}

async function fetchAreaItems() {
  store.teleports = [];
  const { record } = await api("item/get/list", {
    areaIdList: [store.activeSubArea.areaId],
    size: 1e3,
  });
  for (const item of record as AreaItem[]) {
    for (const typeId of item.typeIdList) {
      const itemType = store.itemTypeMap[typeId];
      if (itemType) {
        itemType.items.push(item);
      } else {
        // TODO
      }
    }
    if (teleportNames.includes(item.name)) {
      store.teleports.push(item);
    }
  }
  fetchMarkers(store.teleports);
}

async function fetchMarkers(items: AreaItem[]) {
  const markersMap = {} as Record<number, MarkerInfo[]>;
  const markers: MarkerInfo[] = await api("marker/get/list_byinfo", {
    itemIdList: items.map((i) => i.itemId),
  });
  for (const i of markers) {
  }
  console.log(markers);
}

export function initTilemap(element: HTMLElement | null) {
  if (!element) return;

  tilemap = new Tilemap({ element, ...teyvatMapConfig });
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
