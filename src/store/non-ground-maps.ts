import { ImageBounds, ImageLayer } from "@7c00/canvas-tilemap";
import { undergroundMaps } from "./non-ground-maps-data";
import { tilemap } from "./tilemap";

let nonGroundMaskLayer: ImageLayer;
const imageLayerMap = {} as Record<string, ImageLayer>;

function createImageLayer(
  url: string,
  bounds: ImageBounds
): Promise<ImageLayer> {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;
    image.addEventListener("load", () => {
      resolve(new ImageLayer(tilemap, { image, bounds }));
    });
  });
}

function showNonGroundMaskLayer() {
  if (!nonGroundMaskLayer) {
    const { tileOffset, size, origin } = tilemap.options;
    const canvas = document.createElement("canvas");
    const canvas2d = canvas.getContext("2d")!;
    canvas2d.fillStyle = "rgba(0, 0, 0, 0.68)";
    canvas2d.rect(0, 0, canvas.width, canvas.height);
    canvas2d.fill();
    nonGroundMaskLayer = new ImageLayer(tilemap, {
      image: canvas,
      bounds: [
        [-origin[0] + tileOffset![0], -origin[1] + tileOffset![1]],
        size,
      ],
    });
  }
  tilemap.imageLayers.add(nonGroundMaskLayer);
}

function hideNonGroundMaskLayer() {
  tilemap.imageLayers.delete(nonGroundMaskLayer);
}

async function showImageLayer(url: string, bounds: ImageBounds) {
  let imageLayer = imageLayerMap[url];
  if (!imageLayer) {
    imageLayer = await createImageLayer(url, bounds);
    imageLayerMap[url] = imageLayer;
  }
  tilemap.imageLayers.add(imageLayer);
  tilemap.draw();
}

function hideImageLayer(url: string) {
  let imageLayer = imageLayerMap[url];
  if (imageLayer) {
    tilemap.imageLayers.delete(imageLayer);
  }
}

export function showNonGroundMaps() {
  showNonGroundMaskLayer();
  for (const [_, { imageUrl, imageBounds }] of undergroundMaps) {
    showImageLayer(imageUrl, imageBounds);
  }
}

export function hideNonGroundMaps() {
  hideNonGroundMaskLayer();
  for (const [_, { imageUrl }] of undergroundMaps) {
    hideImageLayer(imageUrl);
  }
  tilemap.draw();
}
