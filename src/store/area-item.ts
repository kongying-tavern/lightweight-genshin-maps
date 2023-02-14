import { store } from ".";
import { api, AreaItem, AreaItemType, MarkerInfo } from "../api";
import { AreaItemMarker } from "./area-item-marker";
import { nonGroundMarkerLayer, tilemap } from "./tilemap";

export const areaItemMarkerMap = {} as Record<number, AreaItemMarker>;
const areaItemMap = {} as Record<number, AreaItem>;
const nonGroundMarkerInfoList = new Set<MarkerInfo>();
const markerInfoListMap = {} as Record<number, MarkerInfo[]>;

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

export async function initAreaItems() {
  // 先移除之前地区的传送点位
  for (const areaItemId of store.teleports) {
    store.activeAreaItems.delete(areaItemId);
    areaItemMarkerMap[areaItemId]?.hideMarkerLayer();
    removeNonGroundMarkers(areaItemId);
  }
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
  activeAreaItems(Array.from(store.teleports));
}

async function activeAreaItems(areaItems: number[]) {
  const itemIdList = [] as number[];
  for (const itemId of areaItems) {
    const areaItemMarker = areaItemMarkerMap[itemId];
    if (areaItemMarker) {
      areaItemMarker.showMarkerLayer();
      // 更新非露天点位
      for (const markerInfo of markerInfoListMap[itemId] ?? []) {
        if (isNonGround(markerInfo)) {
          nonGroundMarkerInfoList.add(markerInfo);
        }
      }
    } else {
      itemIdList.push(itemId);
    }
  }

  if (itemIdList.length) {
    fetchMarkerInfo(itemIdList);
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

/**
 * 移除非露天点位
 */
function removeNonGroundMarkers(areaItemId: number) {
  for (const markerInfo of markerInfoListMap[areaItemId] ?? []) {
    if (isNonGround(markerInfo)) {
      nonGroundMarkerInfoList.delete(markerInfo);
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
