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


  function createMarkerImage(url: string) {
    const canvas = document.createElement("canvas");
    const node = document.createElement("div");
    node.style.width = "32px";
    node.style.height = "35px";
    node.style.position = "relative";
    node.innerHTML = `<svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="Page_01_PC" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="展开/包含切图" transform="translate(-912.000000, -444.000000)">
          <g id="loc_02_off" transform="translate(902.000000, 434.000000)">
            <circle id="椭圆形" fill-opacity="0.298595935" fill="#000000" cx="42" cy="42" r="32"></circle>
            <path
              d="M42,13 C58.0162577,13 71,25.9837423 71,42 C71,58.0162577 58.0162577,71 42,71 C25.9837423,71 13,58.0162577 13,42 C13,25.9837423 25.9837423,13 42,13 Z M42,20 C29.8497355,20 20,29.8497355 20,42 C20,54.1502645 29.8497355,64 42,64 C54.1502645,64 64,54.1502645 64,42 C64,29.8497355 54.1502645,20 42,20 Z"
              id="形状结合" fill="#FFFFFF"></path>
          </g>
        </g>
      </g>
    </svg>`
    const node2 = document.createElement("div");
    node2.innerHTML = `<svg width="32" height="32" viewBox="0 0 64 64" version="1.1"
      style="margin: 0 auto;left: 0;right: 0;top: 0px; position: absolute" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="Page_01_PC" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="展开/包含切图" transform="translate(-1103.000000, -336.000000)">
          <g id="loc_02_on" transform="translate(1093.000000, 326.000000)">
            <g id="形状结合"
              transform="translate(42.000000, 42.000000) rotate(-315.000000) translate(-42.000000, -42.000000) ">
              <path
              d="M42,13 C58.0162577,13 71,25.9837423 71,42 L64,42 L64,42 C64,29.8497355 54.1502645,20 42,20 C29.8497355,20 20,29.8497355 20,42 C20,54.1502645 29.8497355,64 42,64 L42,71 L42,71 C25.9837423,71 13,58.0162577 13,42 C13,25.9837423 25.9837423,13 42,13 Z"
              id="path-1" fill="#E0E0E0" fill-rule="evenodd"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
    <svg width="12px" height="12px" viewBox="0 0 24 24" version="1.1"
      style="margin: 0 auto;left: 0;right: 0;top: 24px; position: absolute" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="Page_01_PC" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="展开/包含切图" transform="translate(-1123.000000, -383.000000)">
          <g id="nail_on" transform="translate(1123.000000, 383.000000)">
            <polygon id="矩形备份" fill-opacity="0.298595935" fill="#000000"
              transform="translate(12.020815, 12.020815) rotate(-225.000000) translate(-12.020815, -12.020815) "
              points="3.52081528 3.52081528 20.5208153 3.52081528 20.5208153 20.5208153 3.52081528 20.5208153"></polygon>
            <polygon id="矩形备份-2" fill="#FFFFFF"
              transform="translate(12.020815, 12.020815) rotate(-225.000000) translate(-12.020815, -12.020815) "
              points="6.52081528 6.52081528 17.5208153 6.52081528 17.5208153 17.5208153 6.52081528 17.5208153"></polygon>
            <g id="矩形备份-3"
              transform="translate(12.020815, 8.485281) rotate(-225.000000) translate(-12.020815, -8.485281) ">
              <path
                d="M9.02081528,5.48528137 C12.3345238,5.48528137 15.0208153,8.17157288 15.0208153,11.4852814 L15.0208153,11.4852814 L15.0208153,11.4852814 L9.02081528,11.4852814 L9.02081528,5.48528137 Z"
                id="path-2" fill="#E0E0E0" fill-rule="evenodd"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>`
    const icon = new Image();
    icon.width = 22;
    icon.height = 22;
    icon.style.left = "0";
    icon.style.right = "0";
    icon.style.margin = "0 auto";
    icon.style.position = "absolute";
    icon.style.top = "5px";
    icon.src = url;
    const image = new Image();
    icon.addEventListener("load", () => {
      const canvas2d = canvas.getContext("2d")!;
      domtoimage.toPng(node).then(function (dataUrl: string) {
        image.src = dataUrl;
        image.addEventListener("load", () => {
          // canvas.width = iconSize;
          // canvas.height = iconSize;

          // let size = [image.width, image.height];
          // if (image.width > image.height) {
          //   size = [iconSize, (size[1] * iconSize) / size[0]];
          // } else {
          //   size = [(size[0] * iconSize) / size[1], iconSize];
          // }
          // canvas2d.drawImage(
          //   image,
          //   (iconSize - size[0]) / 2,
          //   (iconSize - size[1]) / 2,
          //   size[0],
          //   size[1]
          // );
          tilemap.draw();
        })
      })
    });
    node?.appendChild(icon);
    node?.appendChild(node2);
    document.body.appendChild(node);
    return image;
  }
}

main();
