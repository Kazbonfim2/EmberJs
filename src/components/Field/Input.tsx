import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "../../lib/classnames";
import { Icon, type IconName } from "../Icon";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Field.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  SpacingProps & {
    leadingIcon?: IconName;
    trailingAction?: ReactNode;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { leadingIcon, trailingAction, className, style, ...rest },
  ref,
) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <div
      className={cx("control", leadingIcon && "has-icon-l", Boolean(trailingAction) && "has-icon-r")}
      style={spacingStyle(spacing)}
    >
      {leadingIcon && <Icon name={leadingIcon} size="sm" className="lead" />}
      <input ref={ref} className={cx("input", className)} style={style} {...domRest} />
      {trailingAction}
    </div>
  );
});
