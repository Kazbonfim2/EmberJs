import { createContext, useContext, type ReactNode } from "react";
import { cx } from "../../lib/classnames";
import { Icon, type IconName } from "../Icon";
import "./Menu.css";

export const MenuContext = createContext<{ close: () => void } | null>(null);

export type MenuItemProps = {
  icon?: IconName;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  children: ReactNode;
};

export function MenuItem({ icon, shortcut, danger, disabled, onSelect, children }: MenuItemProps) {
  const menu = useContext(MenuContext);
  return (
    <li role="none">
      <button
        role="menuitem"
        type="button"
        className={cx("menu-item", danger && "danger")}
        aria-disabled={disabled || undefined}
        onClick={() => {
          if (disabled) return;
          onSelect?.();
          menu?.close();
        }}
      >
        {icon && <Icon name={icon} size="sm" />}
        {children}
        {shortcut && <kbd>{shortcut}</kbd>}
      </button>
    </li>
  );
}

export function MenuSeparator() {
  return <li className="menu-sep" role="separator" />;
}
