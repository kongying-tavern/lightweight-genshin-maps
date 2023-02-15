import classNames from "classnames";
import { useSnapshot } from "valtio";
import compassIcon from "../images/icon-compass.png";
import { activateArea, store, toggleAreaPicker } from "./store";
import { AreaIconName, areaIcons } from "./store/area-icons";

export function AreaPicker() {
  const { activeTopArea, activeSubArea, topAreaList, isAreaPickerOpen } =
    useSnapshot(store);
  if (activeTopArea == null) return null;

  return (
    <>
      <div
        className={classNames(
          "absolute h-16 md:h-20 flex items-center ease-out duration-300",
          isAreaPickerOpen ? "opacity-0 -right-20" : "opacity-100 right-4"
        )}
        onClick={toggleAreaPicker}
      >
        <div className="flex-1 flex flex-col pt-1 mr-4 items-end justify-center">
          <div className="text-white flex items-center">
            <div className="rounded-full px-2 h-6 bg-black/50 mr-2 flex items-center">
              <img className="w-5 md:h-5 mr-1" src={compassIcon} />
              <div className="leading-none text-sm">更换地区</div>
            </div>
            <div className="text-xl md:text-2xl font-semibold">
              {activeTopArea.name}
            </div>
          </div>
          <div className="text-yellow-400 font-semibold text-sm md:text-base">
            当前选择 - {activeSubArea.name}
          </div>
        </div>
        <img
          className="w-12 h-12 md:w-16 md:h-16"
          src={areaIcons[activeTopArea.name as AreaIconName].default}
        />
      </div>
      <div
        className={classNames(
          "absolute w-full h-16 md:h-20 flex items-center justify-center ease-out duration-300",
          isAreaPickerOpen
            ? "top-0 opacity-100"
            : "-top-20 md:-top-16 opacity-0"
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
              className="mx-2 relative w-11 h-11 md:w-14 md:h-14"
              onClick={() => {
                activateArea(i.children[0].areaId);
              }}
            >
              <img
                className={classNames(
                  "absolute w-16 h-16 md:w-20 md:h-20 -top-2.5 -left-2.5 md:-top-3 md:-left-3 ease-out duration-300",
                  activeTopArea == i ? "opacity-100" : "opacity-0"
                )}
                src={icon.active}
              />
              <>
                <img className="w-full h-full" src={icon.white} />
                <img
                  className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100 ease-out duration-300"
                  src={icon.default}
                />
              </>
            </div>
          );
        })}
        <div
          className={classNames(
            "absolute top-16 md:top-20 px-8 py-2 flex flex-wrap gap-2 justify-center",
            !isAreaPickerOpen && "hidden"
          )}
        >
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
