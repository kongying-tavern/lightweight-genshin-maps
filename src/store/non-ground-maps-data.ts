import { ImageBounds } from "@7c00/canvas-tilemap";

export interface NonGroundMap {
  name: string;
  url?: string;
  bounds?: ImageBounds;
  position?: [number, number];
}

/**
 * 单层非露天地图
 */
export const nonGroundMaps: NonGroundMap[] = [
  {
    name: "诸法丛林1",
    url: `https://assets.yuanshen.site/overlay/YL/1.png`,
    bounds: [
      [-6299 + 1427, -2190 + 1353],
      [-6299 + 1427 + 404, -2190 + 1353 + 504],
    ],
  },
  {
    name: "诸法丛林2",
    url: `https://assets.yuanshen.site/overlay/YL/2.png`,
    bounds: [
      [-6299 + 1299, -2190 + 2040],
      [-6299 + 1299 + 648, -2190 + 2040 + 570],
    ],
  },
  {
    name: "诸法丛林3",
    url: `https://assets.yuanshen.site/overlay/YL/3.png`,
    bounds: [
      [-6299 + 2199, -2190 + 1671],
      [-6299 + 2199 + 398, -2190 + 1671 + 306],
    ],
  },
  {
    name: "诸法丛林4",
    url: `https://assets.yuanshen.site/overlay/YL/4.png`,
    bounds: [
      [-6299 + 2177, -2190 + 2168],
      [-6299 + 2177 + 570, -2190 + 2168 + 515],
    ],
  },
  {
    name: "诸法丛林5",
    url: `https://assets.yuanshen.site/overlay/YL/5.png`,
    bounds: [
      [-6299 + 2734, -2190 + 937],
      [-6299 + 2734 + 433, -2190 + 937 + 660],
    ],
  },
  {
    name: "诸法丛林6",
    url: `https://assets.yuanshen.site/overlay/YL/6.png`,
    bounds: [
      [-6299 + 3323, -2190 + 507],
      [-6299 + 3323 + 443, -2190 + 507 + 377],
    ],
  },
  {
    name: "诸法丛林7",
    url: `https://assets.yuanshen.site/overlay/YL/7.png`,
    bounds: [
      [-6299 + 3426, -2190 + 924],
      [-6299 + 3426 + 278, -2190 + 924 + 360],
    ],
  },
  {
    name: "诸法丛林8",
    url: `https://assets.yuanshen.site/overlay/YL/8.png`,
    bounds: [
      [-6299 + 3796, -2190 + 1024],
      [-6299 + 3796 + 344, -2190 + 1024 + 393],
    ],
  },
  {
    name: "诸法丛林9",
    url: `https://assets.yuanshen.site/overlay/YL/9.png`,
    bounds: [
      [-6299 + 3563, -2190 + 1604],
      [-6299 + 3563 + 443, -2190 + 1604 + 799],
    ],
  },
  {
    name: "诸法丛林10",
    url: `https://assets.yuanshen.site/overlay/YL/10.png`,
    bounds: [
      [-6299 + 3787, -2190 + 2710],
      [-6299 + 3787 + 378, -2190 + 2710 + 560],
    ],
  },
  {
    name: "诸法丛林11",
    url: `https://assets.yuanshen.site/overlay/YL/11.png`,
    bounds: [
      [-6299 + 3086, -2190 + 3297],
      [-6299 + 3086 + 521, -2190 + 3297 + 433],
    ],
  },
  {
    name: "诸法丛林12",
    url: `https://assets.yuanshen.site/overlay/YL/12.png`,
    bounds: [
      [-6299 + 1887, -2190 + 3637],
      [-6299 + 1887 + 740, -2190 + 3637 + 346],
    ],
  },
  {
    name: "大赤沙海1",
    url: `https://assets.yuanshen.site/overlay/SM/固定底图1.png`,
    bounds: [
      [-7664 + 142, 540 + 1183],
      [-7664 + 142 + 1119, 540 + 1183 + 1351],
    ],
  },
  {
    name: "大赤沙海2",
    url: `https://assets.yuanshen.site/overlay/SM/固定底图2.png`,
    bounds: [
      [-7664 + 756, 540 + 2256],
      [-7664 + 756 + 372, 540 + 2256 + 105],
    ],
  },
  {
    name: "大赤沙海3",
    url: `https://assets.yuanshen.site/overlay/SM/固定底图3.png`,
    bounds: [
      [-7664 + 2062, 540 + 303],
      [-7664 + 2062 + 152, 540 + 303 + 132],
    ],
  },
  {
    name: "大赤沙海4",
    url: `https://assets.yuanshen.site/overlay/SM/固定底图4.png`,
    bounds: [
      [-7664 + 2072, 540 + 796],
      [-7664 + 2072 + 160, 540 + 796 + 178],
    ],
  },
  {
    name: "大赤沙海5",
    url: `https://assets.yuanshen.site/overlay/SM/固定底图5.png`,
    bounds: [
      [-7664 + 1948, 540 + 1483],
      [-7664 + 1948 + 293, 540 + 1483 + 465],
    ],
  },
  {
    name: "大赤沙海6",
    url: `https://assets.yuanshen.site/overlay/SM/固定底图6.png`,
    bounds: [
      [-7664 + 2254, 540 + 1370],
      [-7664 + 2254 + 332, 540 + 1370 + 271],
    ],
  },
  {
    name: "大赤沙海7",
    url: `https://assets.yuanshen.site/overlay/SM/固定底图7.png`,
    bounds: [
      [-7664 + 2708, 540 + 1656],
      [-7664 + 2708 + 398, 540 + 1656 + 365],
    ],
  },
  {
    name: "大赤沙海8",
    url: `https://assets.yuanshen.site/overlay/SM/固定底图8.png`,
    bounds: [
      [-7664 + 1608, 540 + 2316],
      [-7664 + 1608 + 985, 540 + 2316 + 693],
    ],
  },
  {
    name: "大赤沙海8",
    url: `https://assets.yuanshen.site/overlay/SM/固定底图8.png`,
    bounds: [
      [-7664 + 1608, 540 + 2316],
      [-7664 + 1608 + 985, 540 + 2316 + 693],
    ],
  },
  {
    name: "生命之殿",
    url: `https://assets.yuanshen.site/overlay/生命之殿-阴影.png`,
    bounds: [
      [-7612, 2],
      [-7612 + 643, 2 + 588],
    ],
  },
  {
    name: "镇灵监牢及巨人峡谷",
    url: `https://assets.yuanshen.site/overlay/镇灵监牢及巨人峡谷-阴影.png`,
    bounds: [
      [-7186, 502],
      [-7186 + 788, 502 + 510],
    ],
  },
  {
    name: "行宫花园",
    url: `https://assets.yuanshen.site/overlay/行宫花园-阴影.png`,
    bounds: [
      [-7219, -785],
      [-7219 + 507, -785 + 522],
    ],
  },
  {
    name: "五绿洲",
    url: `https://assets.yuanshen.site/overlay/五绿洲-阴影.png`,
    bounds: [
      [-6171, -730],
      [-6171 + 643, -730 + 390],
    ],
  },
];

export const multiLevelNonGroundMaps: NonGroundMap[][] = [
  [
    {
      name: "秘仪圣殿 - 上",
      url: "https://assets.yuanshen.site/overlay/SM/秘仪1.png",
      bounds: [
        [-7664 + 1108, 540 + 1682],
        [-7664 + 1108 + 460, 540 + 1682 + 259],
      ],
    },
    {
      name: "秘仪圣殿 - 中",
      url: "https://assets.yuanshen.site/overlay/SM/秘仪2.png",
      bounds: [
        [-7664 + 1129, 540 + 1589],
        [-7664 + 1129 + 279, 540 + 1589 + 325],
      ],
    },
    {
      name: "秘仪圣殿 - 下",
      url: "https://assets.yuanshen.site/overlay/SM/秘仪3.png",
      bounds: [
        [-7664 + 1149, 540 + 1629],
        [-7664 + 1149 + 305, 540 + 1629 + 259],
      ],
    },
  ],
  [
    {
      name: "赤王陵 - 上",
      url: "https://assets.yuanshen.site/overlay/SM/王陵1.png",
      bounds: [
        [-7664 + 729, 540 + 1729],
        [-7664 + 729 + 124, 540 + 1729 + 85],
      ],
    },
    {
      name: "赤王陵 - 中",
      url: "https://assets.yuanshen.site/overlay/SM/王陵2.png",
      bounds: [
        [-7664 + 696, 540 + 1642],
        [-7664 + 696 + 372, 540 + 1642 + 246],
      ],
    },
    {
      name: "赤王陵 - 下",
      url: "https://assets.yuanshen.site/overlay/SM/王陵3.png",
      bounds: [
        [-7664 + 721, 540 + 1702],
        [-7664 + 721 + 187, 540 + 1702 + 166],
      ],
    },
    { name: "衡淮大厅" },
  ],
  [
    {
      name: "舍身步道 - 上",
      url: "https://assets.yuanshen.site/overlay/SM/舍身1.png",
      bounds: [
        [-7664 + 2250, 540 + 1489],
        [-7664 + 2250 + 356, 540 + 1489 + 432],
      ],
    },
    {
      name: "舍身步道 - 中",
      url: "https://assets.yuanshen.site/overlay/SM/舍身2.png",
      bounds: [
        [-7664 + 2152, 540 + 1596],
        [-7664 + 2152 + 312, 540 + 1596 + 398],
      ],
    },
    {
      name: "舍身步道 - 下",
      url: "https://assets.yuanshen.site/overlay/SM/舍身3.png",
      bounds: [
        [-7664 + 2276, 540 + 1649],
        [-7664 + 2276 + 324, 540 + 1649 + 332],
      ],
    },
  ],
  [
    {
      name: "圣显厅 - 上",
      url: "https://assets.yuanshen.site/overlay/SM/圣显1.png",
      bounds: [
        [-7664 + 1834, 540 + 509],
        [-7664 + 1834 + 567, 540 + 509 + 212],
      ],
    },
    {
      name: "圣显厅 - 中",
      url: "https://assets.yuanshen.site/overlay/SM/圣显2.png",
      bounds: [
        [-7664 + 1809, 540 + 502],
        [-7664 + 1809 + 592, 540 + 502 + 226],
      ],
    },
    {
      name: "圣显厅 - 下",
      url: "https://assets.yuanshen.site/overlay/SM/圣显3.png",
      bounds: [
        [-7664 + 1822, 540 + 509],
        [-7664 + 1822 + 579, 540 + 509 + 219],
      ],
    },
  ],
];

export const nonGroundMaps3: NonGroundMap[][] = [
  [
    {
      name: "赤王的水晶杯",
      url: "https://assets.yuanshen.site/overlay/赤王的水晶杯-阴影.png",
      bounds: [
        [-7043, -284],
        [-7043 + 769, -284 + 902],
      ],
    },
    {
      name: "永恒绿洲",
      url: "https://assets.yuanshen.site/overlay/永恒绿洲-阴影.png",
      bounds: [
        [-6793, -125],
        [-6793 + 698, -125 + 689],
      ],
    },
  ],
  [
    {
      name: "酣乐之殿 - 上",
      url: "https://assets.yuanshen.site/overlay/酣乐之殿1-阴影.png",
      bounds: [
        [-6972, -455],
        [-6972 + 270, -455 + 354],
      ],
    },
    {
      name: "酣乐之殿 - 中",
      url: "https://assets.yuanshen.site/overlay/酣乐之殿2-阴影.png",
      bounds: [
        [-6882, -548],
        [-6882 + 505, -548 + 514],
      ],
    },
    {
      name: "酣乐之殿 - 下",
      url: "https://assets.yuanshen.site/overlay/酣乐之殿3-阴影.png",
      bounds: [
        [-6997, -496],
        [-6997 + 347, -496 + 178],
      ],
    },
    {
      name: "酣乐之殿 - 底",
      url: "https://assets.yuanshen.site/overlay/酣乐之殿4-阴影.png",
      bounds: [
        [-6904, -494],
        [-6904 + 285, -494 + 279],
      ],
    },
  ],
  [
    {
      name: "赤王神殿 - 上",
      url: "https://assets.yuanshen.site/overlay/居尔城墟·赤王神殿1-阴影.png",
      bounds: [
        [-7341, 1174],
        [-7341 + 583, 1174 + 688],
      ],
    },
    {
      name: "赤王神殿 - 中",
      url: "https://assets.yuanshen.site/overlay/居尔城墟·赤王神殿2-阴影.png",
      bounds: [
        [-6886, 1577],
        [-6886 + 130, 1577 + 169],
      ],
    },
    {
      name: "赤王神殿 - 下",
      url: "https://assets.yuanshen.site/overlay/居尔城墟·赤王神殿3-阴影.png",
      bounds: [
        [-7317, 1237],
        [-7317 + 581, 1237 + 482],
      ],
    },
  ],
  [
    {
      name: "君王之殿 - 上",
      url: "https://assets.yuanshen.site/overlay/君王之殿1-阴影.png",
      bounds: [
        [-6310, 138],
        [-6310 + 442, 138 + 409],
      ],
    },
    {
      name: "君王之殿 - 中",
      url: "https://assets.yuanshen.site/overlay/君王之殿2-阴影.png",
      bounds: [
        [-6089, 139],
        [-6089 + 222, 139 + 139],
      ],
    },
    {
      name: "君王之殿 - 下",
      url: "https://assets.yuanshen.site/overlay/君王之殿3-阴影.png",
      bounds: [
        [-6368, 145],
        [-6368 + 435, 145 + 468],
      ],
    },
  ],
  [
    {
      name: "沙虫隧道 - 上",
      url: "https://assets.yuanshen.site/overlay/沙虫隧道1-阴影.png",
      bounds: [
        [-5914, -61],
        [-5914 + 682, -61 + 814],
      ],
    },
    {
      name: "沙虫隧道 - 中",
      url: "https://assets.yuanshen.site/overlay/沙虫隧道2-阴影.png",
      bounds: [
        [-5517, -19],
        [-5517 + 275, -19 + 506],
      ],
    },
    {
      name: "沙虫隧道 - 下",
      url: "https://assets.yuanshen.site/overlay/沙虫隧道3-阴影.png",
      bounds: [
        [-5490, -25],
        [-5490 + 180, -25 + 290],
      ],
    },
  ],
];
