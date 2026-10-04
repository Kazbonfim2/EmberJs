import { useState, type ReactNode } from "react";
import {
  FloatingFocusManager,
  FloatingPortal,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { Button } from "../Button";
import { Icon } from "../Icon";
import "./Popover.css";

export type PopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
};

export function Popover({ trigger, children }: PopoverProps) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    middleware: [offset(6), flip(), shift({ padding: 8 })],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  return (
    <>
      <Button variant="secondary" ref={refs.setReference} {...getReferenceProps()}>
        {trigger}
        <Icon name="chevron-down" size="sm" />
      </Button>
      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div ref={refs.setFloating} style={floatingStyles} className="popover-body" {...getFloatingProps()}>
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
