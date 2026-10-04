import type { CSSProperties, HTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Progress.css";

export type ProgressVariant = "default" | "ok" | "paused" | "live";

export type ProgressProps = Omit<HTMLAttributes<HTMLDivElement>, "role"> &
  SpacingProps & {
    value: number;
    variant?: ProgressVariant;
    label: string;
  };

export function Progress({ value, variant = "default", label, className, style, ...rest }: ProgressProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cx("progress", variant !== "default" && `is-${variant}`, className)}
      style={{ ...spacingStyle(spacing), ...style, "--v": `${value}%` } as CSSProperties}
      {...domRest}
    >
      <span />
    </div>
  );
}
