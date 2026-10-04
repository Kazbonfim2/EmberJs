import type { SVGAttributes } from "react";
import { cx } from "../../lib/classnames";

export type IconName =
  | "x" | "minus" | "square" | "plus" | "check" | "search" | "eye" | "eye-off"
  | "chevron-down" | "chevron-left" | "chevron-right" | "download" | "bell" | "info"
  | "circle-alert" | "circle-check" | "triangle-alert" | "trash" | "copy" | "ellipsis"
  | "sun" | "moon" | "play" | "gamepad" | "library" | "store" | "users" | "settings";

export type IconProps = SVGAttributes<SVGSVGElement> & {
  name: IconName;
  size?: "sm" | "md";
};

export function Icon({ name, size = "md", className, ...rest }: IconProps) {
  return (
    <svg className={cx("ic", size === "sm" && "ic-sm", className)} aria-hidden="true" {...rest}>
      <use href={`#i-${name}`} />
    </svg>
  );
}
