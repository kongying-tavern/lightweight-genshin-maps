import classNames from "classnames";
import { render } from "react-dom";
import { useSnapshot } from "valtio";
import { AreaItem, MarkerInfo } from "./api";
import { mark, store, unmark } from "./store";

export function createMarkerInfoWindow(
  areaItem: AreaItem,
  markerInfo: MarkerInfo
) {
  const element = document.createElement("div");
  const { classList } = element;
  classList.add("relative", "-left-1/2", "w-56", "bg-orange-50", "shadow");
  classList.add("rounded-lg", "text-sm", "flex", "flex-col", "gap-2", "marker");
  classList.add("p-3");
  element.style.top = "calc(-100% - 46px)";
  render(<MarkerInfoWindow {...markerInfo} areaItem={areaItem} />, element);
  return element;
}

interface MarkerInfoWindowProps extends MarkerInfo {
  areaItem: AreaItem;
}

function MarkerInfoWindow(props: MarkerInfoWindowProps) {
  const { markedIdList } = useSnapshot(store);
  const marked = markedIdList.has(props.id);
  let markButton = null;
  if (!props.areaItem.specialFlag) {
    const buttonClass = "flex-1 rounded-full text-center border border-solid";
    markButton = (
      <div className="h-5 p-0.5 mt-1 rounded-full border border-yellow-900/50 border-solid flex">
        <div
          className={classNames(
            buttonClass,
            marked
              ? "border-transparent"
              : "bg-yellow-900/40 border-yellow-900/60 text-white"
          )}
          onClick={() => unmark(props.id)}
        >
          未完成
        </div>
        <div
          className={classNames(
            buttonClass,
            marked
              ? "bg-cyan-600/90 border-cyan-900/80 text-white"
              : "border-transparent"
          )}
          onClick={() => mark(props.id)}
        >
          已完成
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="text-gray-900">{props.markerTitle}</div>
      <div className="text-gray-500 text-xs">{props.content}</div>
      {props.picture && <img className="w-full rounded" src={props.picture} />}
      {markButton}
    </>
  );
}
