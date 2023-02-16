import {
  DomLayer,
  MarkerEvent,
  TileLayer,
  Tilemap,
} from "@7c00/canvas-tilemap";
import { closeAreaPicker, closeDrawer, mark, store, tileLayerMap } from ".";
import { teyvatMapConfig } from "../maps-config";
import { createMarkerInfoWindow } from "../marker-info-window";
import { initNonGroundMaps, multiLevelMaps } from "./non-ground-maps";

export let tilemap: Tilemap;
let teyvatTileLayer: TileLayer;
let markerInfoLayer: DomLayer;

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
    }
    tilemap.draw();
  }

  closeAreaPicker();
  if (window.innerWidth < 768) {
    closeDrawer();
  }
}

function onMove() {
  if (Math.log2(tilemap.scale) > -2) {
    store.showsLevelSwitch = true;
  } else {
    store.showsLevelSwitch = false;
  }
}

export async function initTilemap(element: HTMLElement | null) {
  if (!element) return;

  tilemap = new Tilemap({
    ...teyvatMapConfig,
    element,
    onClick: onTilemapClick,
    onMove: onMove,
  });
  teyvatTileLayer = new TileLayer(tilemap, {
    minZoom: 10,
    maxZoom: 13,
    getTileUrl: teyvatMapConfig.getTileUrl,
  });
  tileLayerMap.set(teyvatMapConfig, teyvatTileLayer);
  tilemap.tileLayers.add(teyvatTileLayer);
  initNonGroundMaps();
}
