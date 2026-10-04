import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import "./Field.css";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...rest }, ref) {
    return (
      <div className="control">
        <textarea ref={ref} className={cx("textarea", className)} {...rest} />
      </div>
    );
  },
);
