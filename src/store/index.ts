import { proxy } from "valtio";
import { proxySet } from "valtio/utils";
import { Area, AreaItemType, fetchAccessToken } from "../api";
import { initAreaList } from "./area";
import {
  initAreaItemTypes,
  initIconMap,
  initMarkedIdList,
  updateShowsMarked,
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
  showsNonGround: false,
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
}

export function toggleShowsMarked() {
  store.showsMarked = !store.showsMarked;
  updateShowsMarked();
}

export function toggleShowsNonGround() {
  store.showsNonGround = !store.showsNonGround;
  updateMarkerLayer();
  if (store.showsNonGround) {
    showNonGroundMaps();
  } else {
    hideNonGroundMaps();
  }
}

export function closeAreaPicker() {
  store.isAreaPickerOpen = false;
}
