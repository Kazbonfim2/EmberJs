import { forwardRef, type SelectHTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import { Icon } from "../Icon";
import "./Field.css";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...rest }, ref) {
    return (
      <div className="control">
        <select ref={ref} className={cx("select", className)} {...rest}>
          {children}
        </select>
        <Icon name="chevron-down" size="sm" className="chev" />
      </div>
    );
  },
);
