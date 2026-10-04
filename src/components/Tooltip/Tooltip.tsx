import { cloneElement, isValidElement, useId, useState, type ReactElement, type Ref } from "react";
import {
  FloatingPortal,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import "./Tooltip.css";

export type TooltipProps = {
  label: string;
  children: ReactElement;
};

/** Envolve um único elemento focável/hoverável com uma dica posicionada pelo Floating UI. */
export function Tooltip({ label, children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "top",
    middleware: [offset(6), flip(), shift({ padding: 8 })],
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  const childRef = isValidElement(children) ? (children.props as { ref?: Ref<Element> }).ref : undefined;
  const ref = useMergeRefs([refs.setReference, childRef]);

  if (!isValidElement(children)) return children;

  return (
    <>
      {cloneElement(
        children as ReactElement<Record<string, unknown>>,
        getReferenceProps({ ref, "aria-describedby": id, ...(children.props as object) }),
      )}
      <FloatingPortal>
        <span
          ref={refs.setFloating}
          id={id}
          role="tooltip"
          className="tip-text"
          style={{ ...floatingStyles, opacity: open ? 1 : 0, visibility: open ? "visible" : "hidden" }}
          {...getFloatingProps()}
        >
          {label}
        </span>
      </FloatingPortal>
    </>
  );
}
