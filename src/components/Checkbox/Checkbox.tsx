import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "../../lib/classnames";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Check.css";

type CheckLikeProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & SpacingProps & { children: ReactNode };

export const Checkbox = forwardRef<HTMLInputElement, CheckLikeProps>(function Checkbox({ children, style, ...rest }, ref) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <label className="check" style={spacingStyle(spacing)}>
      <input ref={ref} type="checkbox" style={style} {...domRest} />
      {children}
    </label>
  );
});

export const Radio = forwardRef<HTMLInputElement, CheckLikeProps>(function Radio({ children, style, ...rest }, ref) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <label className="check" style={spacingStyle(spacing)}>
      <input ref={ref} type="radio" style={style} {...domRest} />
      {children}
    </label>
  );
});

export const Switch = forwardRef<HTMLInputElement, CheckLikeProps>(function Switch({ children, className, style, ...rest }, ref) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <label className="check" style={spacingStyle(spacing)}>
      <input ref={ref} type="checkbox" role="switch" className={cx("switch", className)} style={style} {...domRest} />
      {children}
    </label>
  );
});
