import type { HTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Badge.css";

export type AvatarStatus = "online" | "away" | "offline";

export type AvatarProps = HTMLAttributes<HTMLSpanElement> &
  SpacingProps & {
    size?: "md" | "lg";
    status?: AvatarStatus;
    /** Nome completo pro aria-label, ex.: "Lucas, online". */
    label: string;
  };

export function Avatar({ size = "md", status, label, className, children, style, ...rest }: AvatarProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <span
      role="img"
      aria-label={label}
      className={cx("avatar", size === "lg" && "lg", status === "offline" && "is-offline", className)}
      style={{ ...spacingStyle(spacing), ...style }}
      {...domRest}
    >
      {children}
      {status && <span className={cx("status", status)} />}
    </span>
  );
}
