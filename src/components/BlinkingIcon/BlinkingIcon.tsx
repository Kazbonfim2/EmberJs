import type { HTMLAttributes } from "react";
import { Icon, type IconName } from "../Icon";
import { cx } from "../../lib/classnames";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./BlinkingIcon.css";

export type BlinkingIconSize = "sm" | "md" | "lg";

export type BlinkingIconProps = HTMLAttributes<HTMLSpanElement> &
  SpacingProps & {
    name: IconName;
    /** P/M/G */
    size?: BlinkingIconSize;
    /** Rótulo acessível; sem ele o ícone é decorativo (aria-hidden). */
    label?: string;
  };

export function BlinkingIcon({ name, size = "md", label, className, style, ...rest }: BlinkingIconProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      className={cx("blink-ic-wrap", className)}
      style={{ ...spacingStyle(spacing), ...style }}
      {...domRest}
    >
      <Icon name={name} size={size === "sm" ? "sm" : "md"} className={cx("blink-ic", size === "lg" && "blink-ic-lg")} />
    </span>
  );
}
