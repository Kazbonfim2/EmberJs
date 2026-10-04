import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "../../lib/classnames";
import { Icon, type IconName } from "../Icon";
import "./Field.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  leadingIcon?: IconName;
  trailingAction?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { leadingIcon, trailingAction, className, ...rest },
  ref,
) {
  return (
    <div className={cx("control", leadingIcon && "has-icon-l", Boolean(trailingAction) && "has-icon-r")}>
      {leadingIcon && <Icon name={leadingIcon} size="sm" className="lead" />}
      <input ref={ref} className={cx("input", className)} {...rest} />
      {trailingAction}
    </div>
  );
});
