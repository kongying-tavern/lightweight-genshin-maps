import { MarkerItem } from "@7c00/canvas-tilemap";
import { MarkerInfo } from "./api";

export function createMarkerInfoElement(item: MarkerItem<MarkerInfo>) {
  const img = `<img class="w-full" src="${item.data?.picture}">`;
  const element = document.createElement("div");
  element.classList.add("relative", "-left-1/2", "w-56", "bg-white", "p-3");
  element.classList.add("rounded-md", "text-sm", "flex", "flex-col", "gap-2");
  element.classList.add("shadow", "marker");
  element.style.top = "calc(-100% - 42px)";
  element.innerHTML = `
        <div class="text-gray-900">${item.data?.markerTitle}</div>
        <div class="text-gray-500 text-xs">${item.data?.content}</div>
        ${item.data?.picture ? img : ""}
    `;
  return element;
}
