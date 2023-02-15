import { proxy } from "valtio";
import { proxySet } from "valtio/utils";
import { Area, AreaItemType, fetchAccessToken } from "../api";
import { initAreaList } from "./area";
import {
  hideTeleports,
  initAreaItemTypes,
  initIconMap,
  initMarkedIdList,
  showTeleports,
  updateMarkerLayer,
} from "./area-item";
import { hideNonGroundMaps, showNonGroundMaps } from "./non-ground-maps";
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
  markedIdList: proxySet<number>(),
  activeAreaItems: proxySet<number>(),
  nonGroundMarkers: proxySet<number>(),
  showsTeleports: false,
  showsMarked: true,
  showsNonGroundOnly: false,
});

export async function initStore() {
  store.accessToken = await fetchAccessToken();
  initIconMap();
  initAreaItemTypes();
  initAreaList();
  initMarkedIdList();
}

export function toggleDrawer() {
  store.isDrawerOpen = !store.isDrawerOpen;
}

export function toggleAreaPicker() {
  store.isAreaPickerOpen = !store.isAreaPickerOpen;
}

export function toggleShowsTeleports() {
  store.showsTeleports = !store.showsTeleports;
  if (store.showsTeleports) {
    showTeleports();
  } else {
    hideTeleports();
  }
}

export function toggleShowsMarked() {
  store.showsMarked = !store.showsMarked;
}

export function toggleShowsNonGroundOnly() {
  store.showsNonGroundOnly = !store.showsNonGroundOnly;
  updateMarkerLayer();
  if (store.showsNonGroundOnly) {
    showNonGroundMaps();
  } else {
    hideNonGroundMaps();
  }
}

export function closeAreaPicker() {
  store.isAreaPickerOpen = false;
}
