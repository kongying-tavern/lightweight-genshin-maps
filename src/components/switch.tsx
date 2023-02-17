import classNames from "classnames";
import { HTMLAttributes, useState } from "react";
import switchOffImage from "../../images/switch-off.png";
import switchOnImage from "../../images/switch-on.png";

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
      className={classNames(
        "h-6 gap-2 flex items-center",
        props.className as string
      )}
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
        style={{ textShadow: "1px 1px 1px #000" }}
      >
        {label}
      </div>
    </div>
  );
}
