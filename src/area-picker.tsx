import { useSnapshot } from "valtio";
import { AreaIconName, areaIcons } from "./area-icons";
import { activateArea, store, toggleAreaPicker } from "./store";
import compassIcon from "../images/icon-compass.png";
import classNames from "classnames";

export function AreaPicker() {
  const { activeTopArea, activeSubArea, topAreaList, isAreaPickerOpen } =
    useSnapshot(store);
  if (activeTopArea == null) return null;

  return (
    <>
      <div
        className={classNames(
          "absolute right-4 h-20 flex items-center ease-out duration-300",
          isAreaPickerOpen ? "opacity-0" : "opacity-100"
        )}
      >
        <div
          className="flex-1 flex flex-col pt-1 mr-4 items-end justify-center"
          onClick={toggleAreaPicker}
        >
          <div className="text-white flex items-center">
            <div className="rounded-full px-3 h-7 bg-black/50 mr-2 flex items-center">
              <img className="w-5 h-5 mr-1" src={compassIcon} />
              更换地区
            </div>
            <div className="text-2xl font-semibold">{activeTopArea.name}</div>
          </div>
          <div className="text-yellow-400 font-semibold">
            当前选择 - {activeSubArea.name}
          </div>
        </div>
        <img
          className="w-16 h-16"
          src={areaIcons[activeTopArea.name as AreaIconName].default}
        />
      </div>
      <div
        className={classNames(
          "absolute w-full h-20 flex items-center justify-center ease-out duration-300",
          isAreaPickerOpen ? "top-0 opacity-100" : "-top-40 opacity-0"
        )}
        style={{
          background:
            "linear-gradient(90deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.5) 50%,rgba(0,0,0,0) 100%)",
        }}
      >
        {topAreaList.map((i) => {
          const icon = areaIcons[i.name as AreaIconName];
          return (
            <div
              className="mx-2 relative w-14 h-14"
              onClick={() => {
                activateArea(i.children[0].areaId);
              }}
            >
              {activeTopArea == i ? (
                <img
                  className="absolute w-20 h-20 -top-3 -left-3"
                  src={icon.active}
                />
              ) : (
                <>
                  <img className="w-full h-full" src={icon.white} />
                  <img
                    className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100 ease-out duration-300"
                    src={icon.default}
                  />
                </>
              )}
            </div>
          );
        })}
        <div className="absolute top-20 px-8 py-3 flex flex-wrap gap-2 justify-center">
          {activeTopArea.children.map((i) => (
            <div
              className={classNames(
                "py-0.5 px-4 rounded-full bg-black/50 text-white font-semibold border-2 border-solid hover:border-white ease-out duration-300",
                activeSubArea == i ? "border-white" : "border-transparent"
              )}
              onClick={() => {
                activateArea(i.areaId);
              }}
            >
              {i.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
