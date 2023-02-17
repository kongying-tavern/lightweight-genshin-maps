import { TileLayerOptions, TilemapOptions } from "@7c00/canvas-tilemap";

export interface MapOptions extends Omit<TilemapOptions, "element"> {
  getTileUrl: TileLayerOptions["getTileUrl"];
}

/**
 * 提瓦特大陆
 */
export const teyvatMap: MapOptions = {
  size: [17408, 16384],
  origin: [3568, 6286],
  tileOffset: [-5120, 0],
  maxZoom: 0.5,
  getTileUrl(x, y, z) {
    return `https://assets.yuanshen.site/tiles_twt34/${z}/${x}_${y}.png`;
  },
};

/**
 * 地下矿区
 */
export const theChasmUndergroundMap: MapOptions = {
  size: [12288, 12288],
  origin: [3568, 6286],
  getTileUrl(x, y, z) {
    return `https://assets.yuanshen.site/tiles_cyjy/${z}/${x}_${y}.png`;
  },
};

/**
 * 渊下宫
 */
export const enkanomiyaMap: MapOptions = {
  size: [12288, 12288],
  origin: [3568, 6286],
  getTileUrl(x, y, z) {
    return `https://assets.yuanshen.site/tiles_yxg2/${z}/${x}_${y}.png`;
  },
};
