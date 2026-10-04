import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "../../lib/classnames";
import "./Check.css";

type CheckLikeProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { children: ReactNode };

export const Checkbox = forwardRef<HTMLInputElement, CheckLikeProps>(function Checkbox({ children, ...rest }, ref) {
  return (
    <label className="check">
      <input ref={ref} type="checkbox" {...rest} />
      {children}
    </label>
  );
});

export const Radio = forwardRef<HTMLInputElement, CheckLikeProps>(function Radio({ children, ...rest }, ref) {
  return (
    <label className="check">
      <input ref={ref} type="radio" {...rest} />
      {children}
    </label>
  );
});

export const Switch = forwardRef<HTMLInputElement, CheckLikeProps>(function Switch({ children, className, ...rest }, ref) {
  return (
    <label className="check">
      <input ref={ref} type="checkbox" role="switch" className={cx("switch", className)} {...rest} />
      {children}
    </label>
  );
});
