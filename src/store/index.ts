import { proxy } from "valtio";
import { proxySet } from "valtio/utils";
import { Area, AreaItemType, fetchAccessToken } from "../api";
import { initAreaList } from "./area";
import {
  initAreaItemTypes,
  initIcons,
  initMarkedIdList,
  updateShowsMarked,
  updateMarkerLayer,
  showTeleports,
  hideTeleports,
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
  showsLevelSwitch: false,
});

export async function initStore() {
  initAccessToken();
  initAreaItemTypes().then(() => {
    initIcons();
    initAreaList();
  });
  initMarkedIdList();
}

export function toggleDrawer() {
  store.isDrawerOpen = !store.isDrawerOpen;
}

export function closeDrawer() {
  store.isDrawerOpen = false;
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

function initAccessToken() {
  store.accessToken = localStorage.getItem("accessToken") ?? "";
}

export async function refreshAccessToken() {
  store.accessToken = await fetchAccessToken();
  localStorage.setItem("accessToken", store.accessToken);
}
