import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Field.css";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & SpacingProps;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ className, style, ...rest }, ref) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <div className="control" style={spacingStyle(spacing)}>
      <textarea ref={ref} className={cx("textarea", className)} style={style} {...domRest} />
    </div>
  );
});
