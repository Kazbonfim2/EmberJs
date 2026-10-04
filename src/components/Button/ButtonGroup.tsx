import type { HTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Button.css";

export type ButtonGroupOrientation = "horizontal" | "vertical";

export type ButtonGroupProps = HTMLAttributes<HTMLDivElement> &
  SpacingProps & {
    orientation?: ButtonGroupOrientation;
    /** Rótulo acessível do grupo, ex.: "Ações da linha". */
    label?: string;
  };

export function ButtonGroup({ orientation = "horizontal", label, className, style, children, ...rest }: ButtonGroupProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <div
      role="group"
      aria-label={label}
      className={cx("btn-group", orientation === "vertical" && "is-vertical", className)}
      style={{ ...spacingStyle(spacing), ...style }}
      {...domRest}
    >
      {children}
    </div>
  );
}
