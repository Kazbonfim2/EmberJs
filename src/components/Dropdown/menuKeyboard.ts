import type { KeyboardEvent } from "react";
import { menuKeyDelta, wrapIndex } from "../../lib/keyboardNav";

export const focusableMenuItems = (menu: HTMLElement): HTMLButtonElement[] =>
  Array.from(menu.querySelectorAll<HTMLButtonElement>('.menu-item:not([aria-disabled="true"])'));

/** Navegação por setas dentro de um menu já aberto (compartilhada por Dropdown e ContextMenu). */
export function handleMenuKeyDown(e: KeyboardEvent<HTMLElement>, menu: HTMLElement | null): void {
  const delta = menuKeyDelta(e.key);
  if (delta === undefined || !menu) return;
  const items = focusableMenuItems(menu);
  const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);
  if (currentIndex === -1) return;
  e.preventDefault();
  items[wrapIndex(currentIndex, delta, items.length)].focus();
}
