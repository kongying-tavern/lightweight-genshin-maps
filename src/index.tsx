import React from "react";
import { render } from "react-dom";
import { AreaPicker } from "./area-picker";
import { Switch } from "./components/switch";
import { Drawer } from "./drawer";
import { init, initTilemap } from "./store";

window.React = React;

function Main() {
  return (
    <>
      <div ref={initTilemap} className="h-full w-full absolute"></div>
      <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-black/50 to-transparent" />
      <AreaPicker />
      <Drawer />
      <div className="absolute bottom-4 left-4 flex flex-col gap-2">
        <Switch label="传送点位" onChange={() => {}} />
        <Switch label="标记点位" onChange={() => {}} />
      </div>
    </>
  );
}

init();
render(<Main />, document.getElementById("main"));
