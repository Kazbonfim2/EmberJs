import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/classnames";
import { Icon, type IconName } from "../Icon";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Field.css";

export type FieldState = "error" | "success";

export type FieldProps = HTMLAttributes<HTMLDivElement> &
  SpacingProps & {
    label: string;
    htmlFor: string;
    state?: FieldState;
    hint?: ReactNode;
    hintIcon?: IconName;
  };

export function Field({ label, htmlFor, state, hint, hintIcon, className, style, children, ...rest }: FieldProps) {
  const hintId = `${htmlFor}-hint`;
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <div className={cx("field", state && `is-${state}`, className)} style={{ ...spacingStyle(spacing), ...style }} {...domRest}>
      <label className="label" htmlFor={htmlFor}>{label}</label>
      {children}
      {hint && (
        <p className="hint" id={hintId}>
          {hintIcon && <Icon name={hintIcon} size="sm" />}
          {hint}
        </p>
      )}
    </div>
  );
}
