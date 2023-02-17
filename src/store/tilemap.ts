import {
  DomLayer,
  MarkerEvent,
  TileLayer,
  Tilemap,
} from "@7c00/canvas-tilemap";
import { closeAreaPicker, closeDrawer, store } from ".";
import {
  enkanomiyaMap,
  MapOptions,
  teyvatMap,
  theChasmUndergroundMap,
} from "../maps-config";
import { createMarkerInfoWindow } from "../marker-info-window";
import { initNonGroundMaps } from "./non-ground-maps";

const defaultMapOptions = { minZoom: 10, maxZoom: 13 };
export let tilemap: Tilemap;
export const tileLayerMap = new Map<MapOptions, TileLayer>();
let defaultTileLayer: TileLayer;
let markerInfoLayer: DomLayer | null;
let mapOptions = teyvatMap;
const mapOptionsMap: Record<number, MapOptions> = {
  4: theChasmUndergroundMap,
  15: enkanomiyaMap,
  16: enkanomiyaMap,
};

function onTilemapClick(event?: MarkerEvent) {
  if (event) {
    const { target, index } = event;
    const { items } = target.options;
    const item = items[index];
    if (markerInfoLayer) {
      tilemap.domLayers.delete(markerInfoLayer);
    }
    markerInfoLayer = new DomLayer(tilemap, {
      // @ts-ignore
      element: createMarkerInfoWindow(target.options.areaItem, item.data!),
      position: [item.x, item.y],
    });
    tilemap.domLayers.add(markerInfoLayer);
    tilemap.draw();
  } else {
    if (markerInfoLayer) {
      tilemap.domLayers.delete(markerInfoLayer);
      markerInfoLayer = null;
    }
    tilemap.draw();
  }

  closeAreaPicker();
  if (window.innerWidth < 768) {
    closeDrawer();
  }
}

function onTilemapMove() {
  if (Math.log2(tilemap.scale) > -2) {
    store.levelSwitchVisible = true;
  } else {
    store.levelSwitchVisible = false;
  }
}

export async function initTilemap(element: HTMLElement | null) {
  if (!element) return;

  tilemap = new Tilemap({
    ...teyvatMap,
    element,
    onClick: onTilemapClick,
    onMove: onTilemapMove,
  });
  const { getTileUrl } = teyvatMap;
  defaultTileLayer = new TileLayer(tilemap, {
    ...defaultMapOptions,
    getTileUrl,
  });
  tileLayerMap.set(teyvatMap, defaultTileLayer);
  tilemap.tileLayers.add(defaultTileLayer);
  initNonGroundMaps();
}

/**
 * 根据地区切换地图配置、底图
 */
export function updateTilemap(areaId: number) {
  const config = mapOptionsMap[areaId] ?? teyvatMap;
  if (mapOptions != config) {
    mapOptions = config;
    const { options, element } = tilemap;
    options.maxZoom = config.maxZoom ?? 0;
    options.origin = config.origin;
    options.size = config.size;
    options.tileOffset = config.tileOffset ?? [0, 0];
    tilemap.resize(element.clientWidth, element.clientHeight);
    tilemap.tileLayers.clear();
    let tileLayer = tileLayerMap.get(config);
    if (!tileLayer) {
      const { getTileUrl } = config;
      tileLayer = new TileLayer(tilemap, { ...defaultMapOptions, getTileUrl });
      tileLayerMap.set(config, tileLayer);
    }
    tilemap.tileLayers.add(tileLayer);
  }
}
