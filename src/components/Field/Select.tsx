import { forwardRef, type SelectHTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import { Icon } from "../Icon";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Field.css";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & SpacingProps;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ className, children, style, ...rest }, ref) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <div className="control" style={spacingStyle(spacing)}>
      <select ref={ref} className={cx("select", className)} style={style} {...domRest}>
        {children}
      </select>
      <Icon name="chevron-down" size="sm" className="chev" />
    </div>
  );
});
