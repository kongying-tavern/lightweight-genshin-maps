import { store } from ".";
import { api, AreaItem, AreaItemType, MarkerInfo } from "../api";
import { AreaItemMarker } from "./area-item-marker";
import { nonGroundMarkerLayer, tilemap } from "./tilemap";

export const areaItemMarkerMap = {} as Record<number, AreaItemMarker>;
const areaItemMap = {} as Record<number, AreaItem>;

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
  for (const id of store.teleports) {
    store.activeAreaItems.delete(id);
    areaItemMarkerMap[id]?.removeMarkerLayer();
  }

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
    const marker = areaItemMarkerMap[itemId];
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
    const marker = new AreaItemMarker(areaItemMap[itemId], markersMap[itemId]);
    await marker.initMarkerLayer();
    areaItemMarkerMap[itemId] = marker;
  }
  tilemap.markerLayers.add(nonGroundMarkerLayer);
  tilemap.draw();
}

export function toggleAreaItem(areaItem: AreaItem) {
  const { itemId } = areaItem;
  if (store.activeAreaItems.has(itemId)) {
    store.activeAreaItems.delete(itemId);
    areaItemMarkerMap[itemId].removeMarkerLayer();
  } else {
    store.activeAreaItems.add(itemId);
    activeAreaItems([areaItem.itemId]);
  }
}
