import { Switch } from "./components/switch";
import {
  store,
  toggleShowsMarked,
  toggleShowsNonGroundOnly,
  toggleShowsTeleports,
} from "./store";

export function Settings() {
  return (
    <div className="absolute bottom-4 left-4 flex flex-col gap-2">
      <Switch
        defaultValue={store.showsNonGroundOnly}
        label="仅显示非露天点位"
        onChange={toggleShowsNonGroundOnly}
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
