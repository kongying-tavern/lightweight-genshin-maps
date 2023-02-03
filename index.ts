import { Tilemap, TileLayer, MarkerLayer } from "@7c00/canvas-tilemap";
import domtoimage from 'dom-to-image';
let accessToken = "";

async function api(path: string, params: Record<string, any> = {}) {
  const response = await fetch(`https://cloud.yuanshen.site/api/${path}`, {
    method: "post",
    body: JSON.stringify(params),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  });
  return (await response.json())["data"];
}

async function fetchAccessToken() {
  const headers = { authorization: "Basic Y2xpZW50OnNlY3JldA==" };
  const response = await fetch(
    "https://cloud.yuanshen.site/oauth/token?scope=all&grant_type=client_credentials",
    { method: "post", headers }
  );
  accessToken = (await response.json())["access_token"];
}

async function main() {
  const tilemap = new Tilemap({
    element: "#canvas",
    size: [17408, 16384],
    origin: [3568, 6286],
    maxZoom: 0.5,

    // 渊下宫
    // size: [12288, 12288],
    // origin: [3568, 6286],
  });

  tilemap.tileLayers.push(
    // 提瓦特大陆
    new TileLayer(tilemap, {
      minZoom: 10,
      maxZoom: 13,
      offset: [-5120, 0],
      getTileUrl(x, y, z) {
        return `https://assets.yuanshen.site/tiles_twt34_2/${z}/${x}_${y}.png`;
      }
    })

    // 渊下宫
    // new TileLayer(tilemap, {
    //   minZoom: 10,
    //   maxZoom: 13,
    //   getTileUrl(x, y, z) {
    //     return `https://assets.yuanshen.site/tiles_yxg2/${z}/${x}_${y}.png`;
    //   },
    // })
  );

  await fetchAccessToken();
  const { record } = await api("icon/get/list", { size: 1000 });
  const iconSize = 32;
  const icons: Record<string, string> = {};
  for (const i of record) {
    icons[i.name] = i.url;
  }

  await addMarker(126);
  await addMarker(1242);
  await addMarker(1561);
  await addMarker(97);
  // 渊下宫点位
  // await addMarker(660);
  // await addMarker(627);

  async function addMarker(id: number) {
    const markers = await api("marker/get/list_byinfo", { itemIdList: [id] });
    tilemap.markerLayers.push(
      new MarkerLayer(tilemap, {
        positions: markers.map((i: any) =>
          i.position.split(",").map((i: string) => parseInt(i))
        ),
        image: createMarkerImage(icons[markers[0].itemList[0].iconTag]),
        offset: [-5120, 0],
      })
    );
  }
  
  var node = document.createElement("div");
  node.innerHTML=`<svg width="32" height="32" viewBox="0 0 64 64" fill="none"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <g id="Page_01_PC" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="展开/包含切图" transform="translate(-912.000000, -444.000000)">
          <g id="loc_02_off" transform="translate(902.000000, 434.000000)">
              <circle id="椭圆形" fill-opacity="0.298595935" fill="#000000" cx="42" cy="42" r="32"></circle>
              <path d="M42,13 C58.0162577,13 71,25.9837423 71,42 C71,58.0162577 58.0162577,71 42,71 C25.9837423,71 13,58.0162577 13,42 C13,25.9837423 25.9837423,13 42,13 Z M42,20 C29.8497355,20 20,29.8497355 20,42 C20,54.1502645 29.8497355,64 42,64 C54.1502645,64 64,54.1502645 64,42 C64,29.8497355 54.1502645,20 42,20 Z" id="形状结合" fill="#FFFFFF"></path>
          </g>
      </g>
  </g>
  </svg>`

  function createMarkerImage(url: string) {
    const canvas = document.createElement("canvas");
    const canvas2d = canvas.getContext("2d")!;

    domtoimage.toPng(node).then(function (dataUrl: string) {
      const image = new Image();
      image.src = dataUrl;
      document.body.appendChild(image);
      image.addEventListener("load", () => {
        canvas.width = iconSize;
        canvas.height = iconSize;
        const radius = iconSize / 2;
        canvas2d.arc(radius, radius, radius, 0, 2 * Math.PI);
        canvas2d.fillStyle = "rgba(255, 255, 255, 0.5)";
        canvas2d.fill();
        // 图片都是正方形的情况下 `canvas2d.drawImage(image, 0, 0, iconSize, iconSize)` 就可以了
        let size = [image.width, image.height];
        if (image.width > image.height) {
          size = [iconSize, (size[1] * iconSize) / size[0]];
        } else {
          size = [(size[0] * iconSize) / size[1], iconSize];
        }

        canvas2d.drawImage(
          image,
          (iconSize - size[0]) / 2,
          (iconSize - size[1]) / 2,
          size[0],
          size[1]
        );
        tilemap.draw();
      })

    });
    return canvas;
  }
}

main();
