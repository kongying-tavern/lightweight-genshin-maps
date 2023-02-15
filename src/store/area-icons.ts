import inazumatActiveIcon from "../../images/inazuma-active.png";
import inazumatIcon from "../../images/inazuma.png";
import liyueActiveIcon from "../../images/liyue-active.png";
import liyueWhiteIcon from "../../images/liyue-white.png";
import liyueIcon from "../../images/liyue.png";
import mondstadtActiveIcon from "../../images/mondstadt-active.png";
import mondstadtWhiteIcon from "../../images/mondstadt-white.png";
import mondstadtIcon from "../../images/mondstadt.png";
import sumertActiveIcon from "../../images/sumeru-active.png";
import sumertWhiteIcon from "../../images/sumeru-white.png";
import sumeruIcon from "../../images/sumeru.png";
import inazumatWhiteIcon from "../../images/inazuma-white.png";

export const areaIcons = {
  蒙德: {
    default: mondstadtIcon,
    active: mondstadtActiveIcon,
    white: mondstadtWhiteIcon,
  },
  璃月: {
    default: liyueIcon,
    active: liyueActiveIcon,
    white: liyueWhiteIcon,
  },
  稻妻: {
    default: inazumatIcon,
    active: inazumatActiveIcon,
    white: inazumatWhiteIcon,
  },
  须弥: {
    default: sumeruIcon,
    active: sumertActiveIcon,
    white: sumertWhiteIcon,
  },
};

export type AreaIconName = keyof typeof areaIcons;
