import type { CSSProperties, HTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import "./Progress.css";

export type ProgressVariant = "default" | "ok" | "paused" | "live";

export type ProgressProps = Omit<HTMLAttributes<HTMLDivElement>, "role"> & {
  value: number;
  variant?: ProgressVariant;
  label: string;
};

export function Progress({ value, variant = "default", label, className, style, ...rest }: ProgressProps) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cx("progress", variant !== "default" && `is-${variant}`, className)}
      style={{ ...style, "--v": `${value}%` } as CSSProperties}
      {...rest}
    >
      <span />
    </div>
  );
}
