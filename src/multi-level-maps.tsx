import { DomLayer } from "@7c00/canvas-tilemap";
import classNames from "classnames";
import { render } from "preact";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { store } from "./store";
import { getImageLayer } from "./store/non-ground-maps";
import { NonGroundMap } from "./store/non-ground-maps-data";
import { tilemap } from "./store/tilemap";

/**
 * 多层地图，提供楼层切换组件及功能
 */
export class MultiLevelMaps {
  levels: NonGroundMap[];
  switch?: DomLayer;
  level = 0;

  constructor(levels: NonGroundMap[]) {
    this.levels = levels;

    if (levels.length > 1) {
      let minX = Number.MAX_SAFE_INTEGER;
      let maxY = Number.MIN_SAFE_INTEGER;
      for (const { bounds } of levels) {
        if (bounds) {
          const [x, y] = bounds[1];
          minX = Math.min(minX, x);
          maxY = Math.max(maxY, y);
        }
      }
      const element = document.createElement("div");
      const position = [minX, maxY] as [number, number];
      this.switch = new DomLayer(tilemap, { element: element, position });
      render(<LevelSwitch maps={this} />, element);
    }
  }

  async show() {
    this.showSwitch();
    const layer = await this.getImageLayer(this.level);
    if (layer) {
      tilemap.imageLayers.add(layer);
    }
  }

  async hide() {
    this.hideSwitch();
    const layer = await this.getImageLayer(this.level);
    if (layer) {
      tilemap.imageLayers.delete(layer);
    }
  }

  async showSwitch() {
    if (this.switch && !tilemap.domLayers.has(this.switch)) {
      tilemap.domLayers.add(this.switch);
    }
  }

  async hideSwitch() {
    if (this.switch && tilemap.domLayers.has(this.switch)) {
      tilemap.domLayers.delete(this.switch);
    }
  }

  getImageLayer(index: number) {
    const { url, bounds } = this.levels[index];
    if (url && bounds) {
      return getImageLayer(url, bounds);
    }
  }

  async setLevel(level: number) {
    let layer = await this.getImageLayer(this.level);
    if (layer) {
      tilemap.imageLayers.delete(layer);
    }
    layer = await this.getImageLayer(level);
    if (layer) {
      tilemap.imageLayers.add(layer);
    }
    tilemap.draw();
    this.level = level;
  }
}

/**
 * 楼层切换
 */
export function LevelSwitch({ maps }: { maps: MultiLevelMaps }) {
  const { levelSwitchVisible } = useSnapshot(store);
  const [level, setLevel] = useState(maps.level);
  return (
    <div className="flex flex-col gap-1">
      {maps.levels.map((i, index) => (
        <div
          className={classNames(
            "w-20 h-6 whitespace-nowrap overflow-hidden rounded text-xs flex items-center justify-center duration-100 ease-out",
            index == level ? "bg-cyan-600 text-white" : "bg-orange-50",
            levelSwitchVisible ? "opacity-100" : "opacity-0"
          )}
          onClick={() => {
            setLevel(index);
            maps.setLevel(index);
          }}
        >
          {i.name}
        </div>
      ))}
    </div>
  );
}
