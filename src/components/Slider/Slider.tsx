import { forwardRef, type InputHTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Slider.css";

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & SpacingProps;

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider({ className, style, ...rest }, ref) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <input
      ref={ref}
      type="range"
      className={cx("slider", className)}
      style={{ ...spacingStyle(spacing), ...style }}
      {...domRest}
    />
  );
});
