import { ImageBounds, ImageLayer, MarkerLayer } from "@7c00/canvas-tilemap";
import nonGroundIcon from "../../images/icon-non-ground.png";
import { MultiLevelMaps } from "./multi-level-maps";
import {
  nonGroundMaps,
  nonGroundMaps2,
  nonGroundMaps3,
} from "./non-ground-maps-data";
import { tilemap } from "./tilemap";

export let nonGroundMarkerLayer: MarkerLayer;
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
  for (const [_, { imageUrl, imageBounds }] of nonGroundMaps) {
    tilemap.imageLayers.add(await getImageLayer(imageUrl, imageBounds));
  }
  for (const maps of multiLevelMaps) {
    maps.show();
  }
  tilemap.draw();
}

export function hideNonGroundMaps() {
  hideNonGroundMaskLayer();
  for (const [_, { imageUrl }] of nonGroundMaps) {
    hideImageLayer(imageUrl);
  }
  for (const maps of multiLevelMaps) {
    maps.hide();
  }
  tilemap.draw();
}

async function createCanvasImage(
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

export async function initNonGroundMaps() {
  nonGroundMarkerLayer = new MarkerLayer(tilemap, {
    items: [],
    image: await createCanvasImage(nonGroundIcon, 16, 16),
    anchor: [0, 1],
    clickable: false,
  });
  tilemap.markerLayers.add(nonGroundMarkerLayer);

  for (const levels of nonGroundMaps2) {
    multiLevelMaps.push(
      new MultiLevelMaps(levels, "https://assets.yuanshen.site/overlay/SM")
    );
  }
  for (const levels of nonGroundMaps3) {
    multiLevelMaps.push(
      new MultiLevelMaps(levels, "https://assets.yuanshen.site/overlay")
    );
  }
}
