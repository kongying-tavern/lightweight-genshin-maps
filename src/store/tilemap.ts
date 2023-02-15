import {
  DomLayer,
  MarkerEvent,
  MarkerLayer,
  TileLayer,
  Tilemap,
} from "@7c00/canvas-tilemap";
import { closeAreaPicker, closeDrawer, tileLayerMap } from ".";
import nonGroundIcon from "../../images/icon-non-ground.png";
import { teyvatMapConfig } from "../maps-config";
import { createMarkerInfoWindow } from "../marker-info-window";

export let tilemap: Tilemap;
export let nonGroundMarkerLayer: MarkerLayer;
let teyvatTileLayer: TileLayer;

function onTilemapClick(event?: MarkerEvent) {
  if (event) {
    const { target, index } = event;
    const { items } = target.options;
    const item = items[index];
    tilemap.domLayers.clear();
    tilemap.domLayers.add(
      new DomLayer(tilemap, {
        // @ts-ignore
        element: createMarkerInfoWindow(target.options.areaItem, item.data!),
        position: [item.x, item.y],
      })
    );
    tilemap.draw();
  } else {
    tilemap.domLayers.clear();
    tilemap.draw();
  }

  closeAreaPicker();
  if (window.innerWidth < 768) {
    closeDrawer();
  }
}

export async function initTilemap(element: HTMLElement | null) {
  if (!element) return;

  tilemap = new Tilemap({
    ...teyvatMapConfig,
    element,
    onClick: onTilemapClick,
  });
  teyvatTileLayer = new TileLayer(tilemap, {
    minZoom: 10,
    maxZoom: 13,
    getTileUrl: teyvatMapConfig.getTileUrl,
  });
  tileLayerMap.set(teyvatMapConfig, teyvatTileLayer);
  tilemap.tileLayers.add(teyvatTileLayer);
  nonGroundMarkerLayer = new MarkerLayer(tilemap, {
    items: [],
    image: await createImage(nonGroundIcon, 16, 16),
    anchor: [0, 1],
    clickable: false,
  });
  tilemap.markerLayers.add(nonGroundMarkerLayer);
}

async function createImage(
  src: string,
  width: number,
  height: number
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  return new Promise((resolve) => {
    const image = new Image();
    image.src = src;
    image.addEventListener("load", () => {
      const canvas2d = canvas.getContext("2d")!;
      canvas2d.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas);
    });
  });
}
