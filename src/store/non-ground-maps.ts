import { ImageBounds, ImageLayer } from "@7c00/canvas-tilemap";
import { MultiLevelMaps } from "../multi-level-maps";
import {
  multiLevelNonGroundMaps,
  nonGroundMaps,
  nonGroundMaps3,
} from "./non-ground-maps-data";
import { tilemap } from "./tilemap";

let nonGroundMaskLayer: ImageLayer;
const imageLayerMap = {} as Record<string, ImageLayer>;
export const multiLevelMaps = [] as MultiLevelMaps[];

export async function getImageLayer(
  url: string,
  bounds: ImageBounds
): Promise<ImageLayer> {
  let imageLayer = imageLayerMap[url];
  if (imageLayer) {
    return imageLayer;
  }
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;
    image.addEventListener("load", () => {
      const imageLayer = new ImageLayer(tilemap, { image, bounds });
      imageLayerMap[url] = imageLayer;
      resolve(imageLayer);
    });
  });
}

function showNonGroundMaskLayer() {
  if (!nonGroundMaskLayer) {
    const { size } = tilemap.options;
    const [x, y] = tilemap.mapPointOffset;
    const canvas = document.createElement("canvas");
    const canvas2d = canvas.getContext("2d")!;
    canvas2d.fillStyle = "rgba(0, 0, 0, 0.68)";
    canvas2d.rect(0, 0, canvas.width, canvas.height);
    canvas2d.fill();
    nonGroundMaskLayer = new ImageLayer(tilemap, {
      image: canvas,
      bounds: [[-x, -y], size],
    });
  }
  tilemap.imageLayers.add(nonGroundMaskLayer);
}

function hideNonGroundMaskLayer() {
  tilemap.imageLayers.delete(nonGroundMaskLayer);
}

function hideImageLayer(url: string) {
  let imageLayer = imageLayerMap[url];
  if (imageLayer) {
    tilemap.imageLayers.delete(imageLayer);
  }
}

export async function showNonGroundMaps() {
  showNonGroundMaskLayer();
  for (const { url, bounds } of nonGroundMaps) {
    if (url && bounds) {
      tilemap.imageLayers.add(await getImageLayer(url, bounds));
    }
  }
  for (const maps of multiLevelMaps) {
    maps.show();
  }
  tilemap.draw();
}

export function hideNonGroundMaps() {
  hideNonGroundMaskLayer();
  for (const { url } of nonGroundMaps) {
    if (url) {
      hideImageLayer(url);
    }
  }
  for (const maps of multiLevelMaps) {
    maps.hide();
  }
  tilemap.draw();
}

export async function initNonGroundMaps() {
  for (const levels of multiLevelNonGroundMaps) {
    multiLevelMaps.push(new MultiLevelMaps(levels));
  }
  for (const levels of nonGroundMaps3) {
    multiLevelMaps.push(new MultiLevelMaps(levels));
  }
}
