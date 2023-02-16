import { DomLayer, ImageBounds } from "@7c00/canvas-tilemap";
import classNames from "classnames";
import { render } from "preact";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { store } from ".";
import { getImageLayer } from "./non-ground-maps";
import { tilemap } from "./tilemap";

export class MultiLevelMaps {
  baseUrl = "";
  levels: [string, ImageBounds][];
  domLayer: DomLayer;
  level = 0;

  constructor(levels: [string, ImageBounds][], baseUrl: string) {
    this.levels = levels;
    this.baseUrl = baseUrl;

    let position = levels[0][1][1];
    for (const [_, bounds] of levels) {
      const [x, y] = bounds[1];
      position[0] = Math.max(position[0], x);
      position[1] = Math.max(position[1], y);
    }
    const element = document.createElement("div");
    this.domLayer = new DomLayer(tilemap, { element: element, position });
    render(<LevelSwitch maps={this} />, element);
  }

  async show() {
    this.addSwitch();
    tilemap.imageLayers.add(await this.getLayer(this.level));
  }

  async hide() {
    this.removeSwitch();
    tilemap.imageLayers.delete(await this.getLayer(this.level));
  }

  async addSwitch() {
    if (!tilemap.domLayers.has(this.domLayer)) {
      tilemap.domLayers.add(this.domLayer);
    }
  }

  async removeSwitch() {
    if (tilemap.domLayers.has(this.domLayer)) {
      tilemap.domLayers.delete(this.domLayer);
    }
  }

  getLayer(index: number) {
    return getImageLayer(
      `${this.baseUrl}/${this.levels[index][0]}.png`,
      this.levels[index][1]
    );
  }

  async setLevel(level: number) {
    tilemap.imageLayers.delete(await this.getLayer(this.level));
    tilemap.imageLayers.add(await this.getLayer(level));
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
            "w-20 h-6 whitespace-nowrap overflow-hidden rounded text-sm flex items-center justify-center duration-100 ease-out",
            index == level ? "bg-cyan-600 text-white" : "bg-orange-50",
            showsLevelSwitch ? "opacity-100" : "opacity-0"
          )}
          onClick={() => {
            setLevel(index);
            maps.setLevel(index);
          }}
        >
          {i[0]}
        </div>
      ))}
    </div>
  );
}
