import { TileLayerOptions, TilemapOptions } from "@7c00/canvas-tilemap";

export interface MapConfig extends Omit<TilemapOptions, "element"> {
  getTileUrl: TileLayerOptions["getTileUrl"];
}

export const teyvatMapConfig: MapConfig = {
  size: [17408, 16384] as [number, number],
  origin: [3568, 6286] as [number, number],
  tileOffset: [-5120, 0] as [number, number],
  maxZoom: 0.5,
  getTileUrl(x: number, y: number, z: number) {
    return `https://assets.yuanshen.site/tiles_twt34/${z}/${x}_${y}.png`;
  },
};

export const theChasmUndergroundMapConfig: MapConfig = {
  size: [12288, 12288] as [number, number],
  origin: [3568, 6286] as [number, number],
  getTileUrl(x: number, y: number, z: number) {
    return `https://assets.yuanshen.site/tiles_cyjy/${z}/${x}_${y}.png`;
  },
};

export const enkanomiyaMapConfig: MapConfig = {
  size: [12288, 12288] as [number, number],
  origin: [3568, 6286] as [number, number],
  getTileUrl(x: number, y: number, z: number) {
    return `https://assets.yuanshen.site/tiles_yxg2/${z}/${x}_${y}.png`;
  },
};

const mapConfigMap: Record<number, MapConfig> = {
  4: theChasmUndergroundMapConfig,
  15: enkanomiyaMapConfig,
  16: enkanomiyaMapConfig,
};

export function getMapConfig(areaId: number) {
  return mapConfigMap[areaId] ?? teyvatMapConfig;
}
