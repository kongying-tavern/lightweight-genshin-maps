import { MarkerItem, MarkerLayer } from "@7c00/canvas-tilemap";
import dom2img from "dom-to-image";
import { render } from "react-dom";
import { isNonGround, store, tilemap } from ".";
import { AreaItem, MarkerInfo } from "../api";

export class AreaItemMarker {
  isTeleport = false;
  areaItem: AreaItem;
  markerInfoList: MarkerInfo[];
  markerLayer?: MarkerLayer;
  markedMarkerLayer?: MarkerLayer;
  items: MarkerItem<MarkerInfo>[] = [];
  markedItems: MarkerItem<MarkerInfo>[] = [];

  constructor(areaItem: AreaItem, markers: MarkerInfo[]) {
    this.areaItem = areaItem;
    this.markerInfoList = markers;
    this.update();
  }

  async initMarkerLayer() {
    if (!this.markerLayer) {
      this.markerLayer = await this.createMarkerLayer(this.items);
      tilemap.markerLayers.add(this.markerLayer);
      tilemap.draw();
    }
    if (!this.markedMarkerLayer) {
      this.markedMarkerLayer = await this.createMarkerLayer(
        this.markedItems,
        true
      );
      tilemap.markerLayers.add(this.markedMarkerLayer);
      tilemap.draw();
    }
  }

  update() {
    this.items = [];
    this.markedItems = [];
    const markerInfoList = this.markerInfoList.filter((i) => {
      return !store.showsNonGroundOnly || isNonGround(i);
    });
    for (const i of markerInfoList) {
      const [x, y] = i.position.split(",").map((i) => parseFloat(i));
      if (store.marked.has(i.id)) {
        this.markedItems.push({ data: i, x, y });
      } else {
        this.items.push({ data: i, x, y });
      }
    }
    if (this.markerLayer) {
      this.markerLayer.options.items = this.items;
    }
    if (this.markedMarkerLayer) {
      this.markedMarkerLayer.options.items = this.items;
    }
    tilemap.draw();
  }

  hideMarkerLayer() {
    if (this.markerLayer) {
      tilemap.markerLayers.delete(this.markerLayer);
    }
    if (this.markedMarkerLayer) {
      tilemap.markerLayers.delete(this.markedMarkerLayer);
    }
    tilemap.draw();
  }

  showMarkerLayer() {
    if (this.markerLayer) {
      tilemap.markerLayers.add(this.markerLayer);
    }
    if (this.markedMarkerLayer) {
      tilemap.markerLayers.add(this.markedMarkerLayer);
    }
    tilemap.draw();
  }

  createMarkerLayer(items: MarkerItem<MarkerInfo>[], marked = false) {
    const iconSize = 36;
    const padding = 5;
    const { specialFlag } = this.areaItem;
    return new Promise<MarkerLayer>((resolve) => {
      const icon = store.iconMap[this.areaItem.iconTag];
      const dom = document.createElement("div");
      dom.style.position = "relative";
      dom.style.width = `${iconSize * devicePixelRatio}px`;
      dom.style.height = `${iconSize * devicePixelRatio}px`;
      const element = (
        <>
          {!specialFlag && <MarkerDecoration marked={marked} />}
          <img
            className="object-contain w-full h-full box-border absolute left-0 top-0"
            style={{ padding: (specialFlag ? 0 : padding) * devicePixelRatio }}
            src={icon}
            onLoad={async () => {
              const image = new Image();
              image.src = await dom2img.toPng(dom);
              resolve(new MarkerLayer(tilemap, { image, items }));
              document.body.removeChild(dom);
            }}
          />
        </>
      );
      render(element, dom);
      document.body.appendChild(dom);
    });
  }
}

function MarkerDecoration(props: { marked: boolean }) {
  const cirlce = (
    <circle fill-opacity="0.298595935" fill="#000000" cx="42" cy="42" r="32" />
  );
  return (
    <svg className="w-full h-full" viewBox="0 0 64 64" fill="none">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-912.000000, -444.000000)">
          <g transform="translate(902.000000, 434.000000)">
            {cirlce}
            <path
              d="M42,13 C58.0162577,13 71,25.9837423 71,42 C71,58.0162577 58.0162577,71 42,71 C25.9837423,71 13,58.0162577 13,42 C13,25.9837423 25.9837423,13 42,13 Z M42,20 C29.8497355,20 20,29.8497355 20,42 C20,54.1502645 29.8497355,64 42,64 C54.1502645,64 64,54.1502645 64,42 C64,29.8497355 54.1502645,20 42,20 Z"
              fill={props.marked ? "rgb(125 211 252)" : "#ffffff"}
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
