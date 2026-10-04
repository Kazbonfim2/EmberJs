import { forwardRef, type InputHTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import "./Slider.css";

export const Slider = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, "type">>(
  function Slider({ className, ...rest }, ref) {
    return <input ref={ref} type="range" className={cx("slider", className)} {...rest} />;
  },
);
