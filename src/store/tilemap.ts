import {
  DomLayer,
  MarkerEvent,
  MarkerLayer,
  TileLayer,
  Tilemap,
} from "@7c00/canvas-tilemap";
import { closeAreaPicker } from ".";
import nonGroundIcon from "../../images/icon-non-ground.png";
import { teyvatMapConfig } from "../maps-config";
import { createMarkerInfoElement } from "../marker-info";

export let tilemap: Tilemap;
export let nonGroundMarkerLayer: MarkerLayer;

function onTilemapClick(event?: MarkerEvent) {
  if (event) {
    const { target, index } = event;
    const { items } = target.options;
    const item = items[index];
    tilemap.domLayers.clear();
    tilemap.domLayers.add(
      new DomLayer(tilemap, {
        element: createMarkerInfoElement(item),
        position: [item.x, item.y],
      })
    );
    tilemap.draw();
  } else {
    tilemap.domLayers.clear();
    tilemap.draw();
  }
  closeAreaPicker();
}

export function initTilemap(element: HTMLElement | null) {
  if (!element) return;

  tilemap = new Tilemap({
    ...teyvatMapConfig,
    element,
    onClick: onTilemapClick,
  });
  tilemap.tileLayers.add(
    new TileLayer(tilemap, {
      minZoom: 10,
      maxZoom: 13,
      getTileUrl: teyvatMapConfig.getTileUrl,
    })
  );
  const nonGroundImage = new Image();
  nonGroundImage.src = nonGroundIcon;
  nonGroundMarkerLayer = new MarkerLayer(tilemap, {
    items: [],
    image: nonGroundImage,
    anchor: [0, 1],
    clickable: false,
  });
  tilemap.markerLayers.add(nonGroundMarkerLayer);
}
