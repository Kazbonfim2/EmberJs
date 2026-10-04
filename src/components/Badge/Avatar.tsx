import type { HTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import "./Badge.css";

export type AvatarStatus = "online" | "away" | "offline";

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  size?: "md" | "lg";
  status?: AvatarStatus;
  /** Nome completo pro aria-label, ex.: "Lucas, online". */
  label: string;
};

export function Avatar({ size = "md", status, label, className, children, ...rest }: AvatarProps) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cx("avatar", size === "lg" && "lg", status === "offline" && "is-offline", className)}
      {...rest}
    >
      {children}
      {status && <span className={cx("status", status)} />}
    </span>
  );
}
