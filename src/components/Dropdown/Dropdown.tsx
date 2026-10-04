import { useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
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
import type { SpacingProps } from "../../lib/spacing";
import { Button, type ButtonVariant } from "../Button";
import { Icon } from "../Icon";
import { focusableMenuItems, handleMenuKeyDown } from "./menuKeyboard";
import { MenuContext } from "./MenuItem";
import "./Menu.css";

export type DropdownProps = SpacingProps & {
  trigger: ReactNode;
  triggerVariant?: ButtonVariant;
  children: ReactNode;
};

export function Dropdown({ trigger, triggerVariant = "secondary", children, ...spacing }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift({ padding: 8 })],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  useEffect(() => {
    if (open && refs.floating.current) focusableMenuItems(refs.floating.current)[0]?.focus();
  }, [open, refs.floating]);

  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => handleMenuKeyDown(e, refs.floating.current);

  return (
    <>
      <Button variant={triggerVariant} ref={refs.setReference} aria-haspopup="menu" aria-expanded={open} {...getReferenceProps()} {...spacing}>
        {trigger}
        <Icon name="chevron-down" size="sm" />
      </Button>
      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
            <ul
              ref={refs.setFloating}
              role="menu"
              className="menu"
              style={floatingStyles}
              onKeyDown={onKeyDown}
              {...getFloatingProps()}
            >
              <MenuContext.Provider value={{ close: () => setOpen(false) }}>{children}</MenuContext.Provider>
            </ul>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
