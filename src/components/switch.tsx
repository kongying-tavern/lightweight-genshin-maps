import { useState, HTMLAttributes } from "react";
import switchOnImage from "../../images/switch-on.png";
import switchOffImage from "../../images/switch-off.png";
import classNames from "classnames";

interface Props
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  defaultValue?: boolean;
  label?: string;
  onChange: (value: boolean) => void;
}

export function Switch({
  defaultValue = false,
  label,
  onChange,
  ...props
}: Props) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div
      {...props}
      className={classNames("h-6 gap-2 flex items-center", props.className)}
      onClick={() => {
        setValue(!value);
        onChange(!value);
      }}
    >
      <div className="w-10 h-5 relative">
        <img
          className={classNames("w-full absolute", value && "block")}
          src={switchOnImage}
        />
        <img
          className={classNames("w-full absolute", value && "hidden")}
          src={switchOffImage}
        />
      </div>
      <div
        className="text-white font-semibold"
        style={{ textShadow: "0 0 8px #000" }}
      >
        {label}
      </div>
    </div>
  );
}
