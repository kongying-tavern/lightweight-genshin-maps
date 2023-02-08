import { render } from "react-dom";
import { Drawer } from "./drawer";
import { init, initTilemap } from "./store";

function Main() {
  return (
    <>
      <div ref={initTilemap} className="h-full w-full absolute"></div>
      <Drawer />
    </>
  );
}

init();
render(<Main />, document.getElementById("main"));
