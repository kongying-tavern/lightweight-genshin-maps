import { store } from "./store";

export interface Area {
  name: string;
  parentId: number;
  areaId: number;
  children: Area[];
}

export interface AreaItem {
  itemId: number;
  areaId: number;
  count: number;
  defaultCountent: string;
  iconTag: string;
  name: string;
  typeIdList: number[];
}

export interface ItemType {
  typeId: number;
  iconTag: string;
  name: string;
  items: AreaItem[];
}

export interface MarkerInfo {
  id: number;
  content: string;
  markerTitle: string;
  markerExtraContent: string;
  position: string;
  picture: string;
}

export async function api(path: string, params: Record<string, any> = {}) {
  const response = await fetch(`https://cloud.yuanshen.site/api/${path}`, {
    method: "post",
    body: JSON.stringify(params),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${store.accessToken}`,
    },
  });
  return (await response.json())["data"];
}

export async function fetchAccessToken() {
  const headers = { authorization: "Basic Y2xpZW50OnNlY3JldA==" };
  const response = await fetch(
    "https://cloud.yuanshen.site/oauth/token?scope=all&grant_type=client_credentials",
    { method: "post", headers }
  );
  return (await response.json())["access_token"];
}
