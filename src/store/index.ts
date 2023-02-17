import { proxy } from "valtio";
import { proxySet } from "valtio/utils";
import { Area, AreaItemType, fetchAccessToken } from "../api";
import { initAreaList } from "./area";
import {
  hideTeleport,
  initAreaItemTypes,
  initIcons,
  loadMarkedSet,
  showTeleport,
  updateMarkerLayer,
  updateMarkedMarkers,
} from "./area-item";
import { hideNonGroundMaps, showNonGroundMaps } from "./non-ground-maps";

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
  markedSet: proxySet<number>(),
  activeAreaItems: proxySet<number>(),
  nonGroundMarkers: proxySet<number>(),
  teleportVisible: false,
  markedVisible: true,
  nonGroundEnabled: false,
  levelSwitchVisible: false,
});

export async function initStore() {
  store.accessToken = localStorage.getItem("accessToken") ?? "";
  initAreaItemTypes().then(() => {
    initIcons();
    initAreaList();
  });
  loadMarkedSet();
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

export function toggleTeleport() {
  store.teleportVisible = !store.teleportVisible;
  if (store.teleportVisible) {
    showTeleport();
  } else {
    hideTeleport();
  }
}

export function toggleMarkedVisible() {
  store.markedVisible = !store.markedVisible;
  updateMarkedMarkers();
}

export function toggleNonGround() {
  store.nonGroundEnabled = !store.nonGroundEnabled;
  updateMarkerLayer();
  if (store.nonGroundEnabled) {
    showNonGroundMaps();
  } else {
    hideNonGroundMaps();
  }
}

export function closeAreaPicker() {
  store.isAreaPickerOpen = false;
}

export async function refreshAccessToken() {
  store.accessToken = await fetchAccessToken();
  localStorage.setItem("accessToken", store.accessToken);
}
