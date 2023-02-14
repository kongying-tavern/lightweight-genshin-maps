import { store } from ".";
import { api, Area } from "../api";
import { initAreaItems } from "./area-item";

/**
 * 初始化地区列表
 */
export async function initAreaList() {
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

/**
 * 切换当前区域
 */
export function activateArea(areaId: number) {
  if (store.activeSubArea.areaId == areaId) return;

  const subArea = store.areaMap[areaId];
  store.activeTopArea = store.areaMap[subArea.parentId];
  store.activeSubArea = subArea;
  initAreaItems();
}
