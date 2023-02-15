import { Switch } from "./components/switch";
import {
  store,
  toggleShowsMarked,
  toggleShowsNonGround,
  toggleShowsTeleports,
} from "./store";

export function Settings() {
  return (
    <div className="absolute bottom-4 left-4 flex flex-col gap-1.5">
      <Switch
        defaultValue={store.showsNonGround}
        label="地下地图"
        onChange={toggleShowsNonGround}
      />
      <Switch
        defaultValue={store.showsTeleports}
        label="传送点位"
        onChange={toggleShowsTeleports}
      />
      <Switch
        defaultValue={store.showsMarked}
        label="标记点位"
        onChange={toggleShowsMarked}
      />
    </div>
  );
}
