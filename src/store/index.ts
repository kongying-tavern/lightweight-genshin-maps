import { proxy } from "valtio";
import { proxySet } from "valtio/utils";
import { Area, AreaItemType, fetchAccessToken } from "../api";
import { initAreaList } from "./area";
import { initAreaItemTypes, initIconMap } from "./area-item";
export * from "./area";
export * from "./area-item";
export * from "./tilemap";

export const store = proxy({
  accessToken: "",
  topAreaList: [] as Area[],
  areaMap: {} as Record<number, Area>,
  activeTopArea: null as unknown as Area,
  activeSubArea: null as unknown as Area,
  itemTypeMap: {} as Record<number, AreaItemType>,
  isDrawerOpen: false,
  isAreaPickerOpen: false,
  iconMap: {} as Record<string, string>,
  teleports: proxySet<number>(),
  marked: proxySet<number>(),
  activeAreaItems: proxySet<number>(),
  nonGroundMarkers: proxySet<number>(),
  showsTeleports: true,
  showsMarked: true,
});

export async function init() {
  store.accessToken = await fetchAccessToken();
  initIconMap();
  initAreaItemTypes();
  initAreaList();
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
