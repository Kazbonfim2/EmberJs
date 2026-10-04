import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/classnames";
import { Icon, type IconName } from "../Icon";
import "./Field.css";

export type FieldState = "error" | "success";

export type FieldProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  htmlFor: string;
  state?: FieldState;
  hint?: ReactNode;
  hintIcon?: IconName;
};

export function Field({ label, htmlFor, state, hint, hintIcon, className, children, ...rest }: FieldProps) {
  const hintId = `${htmlFor}-hint`;
  return (
    <div className={cx("field", state && `is-${state}`, className)} {...rest}>
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
