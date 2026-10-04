import type { HTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import "./Badge.css";

export type BadgeVariant = "default" | "ok" | "err" | "warn" | "info" | "muted";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ variant = "default", className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx("badge", variant !== "default" && `badge-${variant}`, className)} {...rest}>
      {children}
    </span>
  );
}
