import { cloneElement, isValidElement, useEffect, useState, type KeyboardEvent, type MouseEvent, type ReactElement } from "react";
import {
  FloatingFocusManager,
  FloatingPortal,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { focusableMenuItems, handleMenuKeyDown } from "../Dropdown/menuKeyboard";
import { MenuContext } from "../Dropdown/MenuItem";
import "../Dropdown/Menu.css";

export type ContextMenuProps = {
  /** Área que recebe o clique com o botão direito. Precisa ser um único elemento. */
  children: ReactElement;
  menu: React.ReactNode;
};

/** Menu de contexto posicionado no ponto do clique direito, via elemento virtual do Floating UI. */
export function ContextMenu({ children, menu }: ContextMenuProps) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    middleware: [offset(2), flip(), shift({ padding: 8 })],
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });
  const { getFloatingProps } = useInteractions([dismiss, role]);

  useEffect(() => {
    if (open && refs.floating.current) focusableMenuItems(refs.floating.current)[0]?.focus();
  }, [open, refs.floating]);

  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => handleMenuKeyDown(e, refs.floating.current);

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    refs.setPositionReference({
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        x: e.clientX,
        y: e.clientY,
        left: e.clientX,
        top: e.clientY,
        right: e.clientX,
        bottom: e.clientY,
      }),
    });
    setOpen(true);
  };

  if (!isValidElement(children)) return children;

  return (
    <>
      {cloneElement(children as ReactElement<Record<string, unknown>>, { onContextMenu, ...(children.props as object) })}
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
              <MenuContext.Provider value={{ close: () => setOpen(false) }}>{menu}</MenuContext.Provider>
            </ul>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
