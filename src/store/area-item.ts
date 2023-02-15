import { proxySet } from "valtio/utils";
import { store } from ".";
import { api, AreaItem, AreaItemType, MarkerInfo } from "../api";
import { AreaItemMarker } from "./area-item-marker";
import { nonGroundMarkerLayer, tilemap } from "./tilemap";

export const areaItemMarkerMap = {} as Record<number, AreaItemMarker>;
const areaItemMap = {} as Record<number, AreaItem>;
const nonGroundMarkerInfoList = new Set<MarkerInfo>();
const markerInfoListMap = {} as Record<number, MarkerInfo[]>;
const markedStorageKey = "markedIdList";

export async function initIconMap() {
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

export async function initAreaItemTypes() {
  const { record } = await api("item_type/get/list/1");
  for (const i of record as AreaItemType[]) {
    i.items = [];
    store.itemTypeMap[i.typeId] = i;
  }
}

export function initMarkedIdList() {
  const json = localStorage.getItem(markedStorageKey);
  if (json) {
    store.markedIdList = proxySet(JSON.parse(json));
  }
}

export async function initAreaItems() {
  // 先移除之前地区的传送点位及非露天图标图层
  hideTeleports();
  tilemap.markerLayers.delete(nonGroundMarkerLayer);

  const { record } = await api("item/get/list", {
    areaIdList: [store.activeSubArea.areaId],
    size: 1e3,
  });

  store.teleports.clear();
  for (const itemType of Object.values(store.itemTypeMap)) {
    itemType.items = [];
  }
  for (const areaItem of record as AreaItem[]) {
    areaItemMap[areaItem.itemId] = areaItem;
    for (const typeId of areaItem.typeIdList) {
      const itemType = store.itemTypeMap[typeId];
      if (itemType) {
        itemType.items.push(areaItem);
      } else {
        // TODO: 宝箱特殊处理
      }
    }
    if (areaItem.specialFlag) {
      store.teleports.add(areaItem.itemId);
    }
  }
  if (store.showsTeleports) {
    activeAreaItems(Array.from(store.teleports));
  }
}

async function activeAreaItems(areaItemIdList: number[]) {
  const toBeFetchedIdList = [] as number[];
  for (const areaItemId of areaItemIdList) {
    const areaItemMarker = areaItemMarkerMap[areaItemId];
    if (areaItemMarker) {
      areaItemMarker.showMarkerLayer();
      addNonGroundMarkers(areaItemId);
    } else {
      toBeFetchedIdList.push(areaItemId);
    }
  }

  if (toBeFetchedIdList.length) {
    fetchMarkerInfo(toBeFetchedIdList);
  } else {
    updateNonGroundMarkerLayer();
  }
}

async function fetchMarkerInfo(itemIdList: number[]) {
  const allMarkerInfoList: MarkerInfo[] = await api("marker/get/list_byinfo", {
    itemIdList,
  });

  for (const markerInfo of allMarkerInfoList) {
    if (isNonGround(markerInfo)) {
      nonGroundMarkerInfoList.add(markerInfo);
    }

    // TODO: 暂时只处理一个 item
    const areaItem = markerInfo.itemList.find((i) =>
      itemIdList.includes(i.itemId)
    )!;
    let markerInfoList = markerInfoListMap[areaItem.itemId];
    if (!markerInfoList) {
      markerInfoList = [];
      markerInfoListMap[areaItem.itemId] = markerInfoList;
    }
    markerInfoList.push(markerInfo);
  }

  for (const areaItemId of itemIdList) {
    const markerInfoList = markerInfoListMap[areaItemId];
    if (!markerInfoList) continue;

    const marker = new AreaItemMarker(areaItemMap[areaItemId], markerInfoList);
    await marker.initMarkerLayer();
    areaItemMarkerMap[areaItemId] = marker;
  }

  updateNonGroundMarkerLayer();
}

export function hideTeleports() {
  for (const areaItemId of store.teleports) {
    store.activeAreaItems.delete(areaItemId);
    areaItemMarkerMap[areaItemId]?.hideMarkerLayer();
    removeNonGroundMarkers(areaItemId);
  }
  updateNonGroundMarkerLayer();
}

export function showTeleports() {
  if (store.teleports.size == 0) return;
  const teleports = Array.from(store.teleports);
  if (!areaItemMarkerMap[teleports[0]]) {
    return activeAreaItems(teleports);
  }

  for (const areaItemId of store.teleports) {
    store.activeAreaItems.add(areaItemId);
    areaItemMarkerMap[areaItemId]?.showMarkerLayer();
    addNonGroundMarkers(areaItemId);
  }
  updateNonGroundMarkerLayer();
}

function updateNonGroundMarkerLayer() {
  tilemap.markerLayers.delete(nonGroundMarkerLayer);
  nonGroundMarkerLayer.options.items = [];
  for (const markerInfo of nonGroundMarkerInfoList) {
    const [x, y] = markerInfo.position.split(",").map((i) => parseFloat(i));
    nonGroundMarkerLayer.options.items.push({ x, y });
  }
  tilemap.markerLayers.add(nonGroundMarkerLayer);
  tilemap.draw();
}

function removeNonGroundMarkers(areaItemId: number) {
  for (const markerInfo of markerInfoListMap[areaItemId] ?? []) {
    if (isNonGround(markerInfo)) {
      nonGroundMarkerInfoList.delete(markerInfo);
    }
  }
}

function addNonGroundMarkers(areaItemId: number) {
  for (const markerInfo of markerInfoListMap[areaItemId] ?? []) {
    if (isNonGround(markerInfo)) {
      nonGroundMarkerInfoList.add(markerInfo);
    }
  }
}

export function toggleAreaItem(areaItem: AreaItem) {
  const { itemId } = areaItem;
  if (store.activeAreaItems.has(itemId)) {
    store.activeAreaItems.delete(itemId);
    areaItemMarkerMap[itemId].hideMarkerLayer();
    removeNonGroundMarkers(itemId);
    updateNonGroundMarkerLayer();
  } else {
    store.activeAreaItems.add(itemId);
    activeAreaItems([areaItem.itemId]);
  }
}

export function isNonGround(markerInfo: MarkerInfo) {
  return markerInfo.markerExtraContent?.includes("sumeru");
}

export function updateMarkerLayer() {
  for (const areaItemId of [...store.activeAreaItems, ...store.teleports]) {
    areaItemMarkerMap[areaItemId]?.update();
  }
}

export function mark(markerId: number) {
  store.markedIdList.add(markerId);
  updateMarkerLayer();
  const markedIdList = Array.from(store.markedIdList);
  localStorage.setItem(markedStorageKey, JSON.stringify(markedIdList));
}

export function unmark(markerId: number) {
  store.markedIdList.delete(markerId);
  updateMarkerLayer();
  const markedIdList = Array.from(store.markedIdList);
  localStorage.setItem(markedStorageKey, JSON.stringify(markedIdList));
}

export function updateShowsMarked() {
  for (const areaItemId in areaItemMarkerMap) {
    const markerLayer = areaItemMarkerMap[areaItemId];
    if (store.showsMarked) {
      markerLayer.showMarked();
    } else {
      markerLayer.hideMarked();
    }
    for (const markerInfo of markerInfoListMap[areaItemId] ?? []) {
      if (!isNonGround(markerInfo)) continue;
      if (store.showsMarked) {
        nonGroundMarkerInfoList.add(markerInfo);
      } else {
        nonGroundMarkerInfoList.delete(markerInfo);
      }
    }
  }
  updateNonGroundMarkerLayer();
}
