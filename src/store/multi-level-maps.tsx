import { DomLayer } from "@7c00/canvas-tilemap";
import classNames from "classnames";
import { render } from "preact";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { store } from ".";
import { getImageLayer } from "./non-ground-maps";
import { NonGroundMap } from "./non-ground-maps-data";
import { tilemap } from "./tilemap";

export class MultiLevelMaps {
  levels: NonGroundMap[];
  domLayer?: DomLayer;
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
      this.domLayer = new DomLayer(tilemap, { element: element, position });
      render(<LevelSwitch maps={this} />, element);
    }
  }

  async show() {
    this.addSwitch();
    const layer = await this.getLayer(this.level);
    if (layer) {
      tilemap.imageLayers.add(layer);
    }
  }

  async hide() {
    this.removeSwitch();
    const layer = await this.getLayer(this.level);
    if (layer) {
      tilemap.imageLayers.delete(layer);
    }
  }

  async addSwitch() {
    if (this.domLayer && !tilemap.domLayers.has(this.domLayer)) {
      tilemap.domLayers.add(this.domLayer);
    }
  }

  async removeSwitch() {
    if (this.domLayer && tilemap.domLayers.has(this.domLayer)) {
      tilemap.domLayers.delete(this.domLayer);
    }
  }

  getLayer(index: number) {
    const { url, bounds } = this.levels[index];
    if (url && bounds) {
      return getImageLayer(url, bounds);
    }
  }

  async setLevel(level: number) {
    let layer = await this.getLayer(this.level);
    if (layer) {
      tilemap.imageLayers.delete(layer);
    }
    layer = await this.getLayer(level);
    if (layer) {
      tilemap.imageLayers.add(layer);
    }
    tilemap.draw();
    this.level = level;
  }
}

export function LevelSwitch({ maps }: { maps: MultiLevelMaps }) {
  const { showsLevelSwitch } = useSnapshot(store);
  const [level, setLevel] = useState(maps.level);
  return (
    <div className="flex flex-col gap-1">
      {maps.levels.map((i, index) => (
        <div
          className={classNames(
            "w-20 h-6 whitespace-nowrap overflow-hidden rounded text-xs flex items-center justify-center duration-100 ease-out",
            index == level ? "bg-cyan-600 text-white" : "bg-orange-50",
            showsLevelSwitch ? "opacity-100" : "opacity-0"
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
