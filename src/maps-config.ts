export const teyvatMapConfig = {
  size: [17408, 16384] as [number, number],
  origin: [3568, 6286] as [number, number],
  tileOffset: [-5120, 0] as [number, number],
  maxZoom: 0.5,
  getTileUrl(x: number, y: number, z: number) {
    return `https://assets.yuanshen.site/tiles_twt34/${z}/${x}_${y}.png`;
  },
};
