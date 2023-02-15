import React from "react";
import { render } from "react-dom";
import { AreaPicker } from "./area-picker";
import { Drawer } from "./drawer";
import { Settings } from "./settings";
import { initStore, initTilemap } from "./store";

window.React = React;

function Main() {
  return (
    <>
      <div ref={initTilemap} className="h-full w-full absolute"></div>
      <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-black/50 to-transparent" />
      <Settings />
      <AreaPicker />
      <Drawer />
    </>
  );
}

initStore();
render(<Main />, document.getElementById("main"));
