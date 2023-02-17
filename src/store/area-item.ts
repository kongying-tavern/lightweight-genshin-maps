import { MarkerLayer } from "@7c00/canvas-tilemap";
import { proxySet } from "valtio/utils";
import { store } from ".";
import nonGroundIcon from "../../images/icon-non-ground.png";
import { api, AreaItem, AreaItemType, MarkerInfo } from "../api";
import { AreaItemMarker } from "../area-item-marker";
import { tilemap } from "./tilemap";

export let nonGroundIconLayer: MarkerLayer;
export const areaItemMarkerMap = {} as Record<number, AreaItemMarker>;
const areaItemMap = {} as Record<number, AreaItem>;
export const nonGroundMarkerInfoList = new Set<MarkerInfo>();
const markerInfoListMap = {} as Record<number, MarkerInfo[]>;
const markedStorageKey = "marked";

export async function initIcons() {
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

export async function initNonGroundIconLayer() {
  nonGroundIconLayer = new MarkerLayer(tilemap, {
    items: [],
    image: await createCanvasImage(nonGroundIcon, 16, 16),
    anchor: [0, 1],
    clickable: false,
  });
  tilemap.markerLayers.add(nonGroundIconLayer);
}

export function loadMarkedSet() {
  const json = localStorage.getItem(markedStorageKey);
  if (json) {
    store.markedSet = proxySet(JSON.parse(json));
  }
}

export async function updateAreaItems() {
  // 先移除之前地区的传送点位及非露天图标图层
  hideTeleport();
  if (nonGroundIconLayer) {
    tilemap.markerLayers.delete(nonGroundIconLayer);
  }

  const { record } = await api("item/get/list", {
    areaIdList: [store.activeSubArea.areaId],
    size: 1e3,
  });

  // 先移除之前的地区物品
  for (const itemType of Object.values(store.itemTypeMap)) {
    itemType.items = [];
  }
  store.teleports.clear();
  for (const areaItem of record as AreaItem[]) {
    areaItemMap[areaItem.itemId] = areaItem;
    for (const typeId of areaItem.typeIdList) {
      const itemType = store.itemTypeMap[typeId];
      if (itemType && areaItem.count > 0 && !areaItem.specialFlag) {
        itemType.items.push(areaItem);
      } else {
        // TODO: 宝箱特殊处理
      }
    }
    if (areaItem.specialFlag) {
      store.teleports.add(areaItem.itemId);
    }
  }
  if (store.teleportVisible) {
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
    updateNonGroundIconLayer();
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

  updateNonGroundIconLayer();
}

export function hideTeleport() {
  for (const areaItemId of store.teleports) {
    store.activeAreaItems.delete(areaItemId);
    areaItemMarkerMap[areaItemId]?.hideMarkerLayer();
    removeNonGroundMarkers(areaItemId);
  }
  updateNonGroundIconLayer();
}

export function showTeleport() {
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
  updateNonGroundIconLayer();
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
    areaItemMarkerMap[itemId]?.hideMarkerLayer();
    removeNonGroundMarkers(itemId);
    updateNonGroundIconLayer();
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

/**
 * 标记点位
 */
export function mark(markerId: number) {
  store.markedSet.add(markerId);
  updateMarkerLayer();
  const markedIdList = Array.from(store.markedSet);
  localStorage.setItem(markedStorageKey, JSON.stringify(markedIdList));
}

/**
 * 取消标记点位
 */
export function unmark(markerId: number) {
  store.markedSet.delete(markerId);
  updateMarkerLayer();
  const markedIdList = Array.from(store.markedSet);
  localStorage.setItem(markedStorageKey, JSON.stringify(markedIdList));
}

/**
 * 更新已标记点位的显示
 */
export function updateMarkedMarkers() {
  for (const areaItemId in areaItemMarkerMap) {
    const markerLayer = areaItemMarkerMap[areaItemId];
    if (store.markedVisible) {
      markerLayer.showMarked();
    } else {
      markerLayer.hideMarked();
    }
    for (const markerInfo of markerInfoListMap[areaItemId] ?? []) {
      if (!isNonGround(markerInfo)) continue;
      if (store.markedVisible) {
        nonGroundMarkerInfoList.add(markerInfo);
      } else {
        nonGroundMarkerInfoList.delete(markerInfo);
      }
    }
  }
  updateNonGroundIconLayer();
}

/**
 * 重新生成非露天点位图标图层
 */
function updateNonGroundIconLayer() {
  if (!nonGroundIconLayer) return;

  tilemap.markerLayers.delete(nonGroundIconLayer);
  nonGroundIconLayer.options.items = [];
  for (const markerInfo of nonGroundMarkerInfoList) {
    const [x, y] = markerInfo.position.split(",").map((i) => parseFloat(i));
    nonGroundIconLayer.options.items.push({ x, y });
  }
  tilemap.markerLayers.add(nonGroundIconLayer);
  tilemap.draw();
}

/**
 * 加载图片并绘制到 canvas 作为 CanvasImageSource，
 * 为的是让图片缩放至目标尺寸 * pixelRatio
 */
async function createCanvasImage(
  src: string,
  width: number,
  height: number
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  return new Promise((resolve) => {
    const image = new Image();
    image.src = src;
    image.addEventListener("load", () => {
      const canvas2d = canvas.getContext("2d")!;
      canvas2d.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas);
    });
  });
}
