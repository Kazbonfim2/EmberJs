import type { HTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Badge.css";

export type BadgeVariant = "default" | "ok" | "err" | "warn" | "info" | "muted";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  SpacingProps & {
    variant?: BadgeVariant;
  };

export function Badge({ variant = "default", className, children, style, ...rest }: BadgeProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <span
      className={cx("badge", variant !== "default" && `badge-${variant}`, className)}
      style={{ ...spacingStyle(spacing), ...style }}
      {...domRest}
    >
      {children}
    </span>
  );
}
