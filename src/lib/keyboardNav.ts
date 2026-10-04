/** Próximo índice com wrap-around (negativo ou acima do length volta pro outro extremo). */
export const wrapIndex = (current: number, delta: number, length: number): number =>
  length === 0 ? 0 : (current + delta + length) % length;

const TAB_DELTA: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
const MENU_DELTA: Record<string, number> = { ArrowDown: 1, ArrowUp: -1 };

export const tabKeyDelta = (key: string): number | undefined => TAB_DELTA[key];
export const menuKeyDelta = (key: string): number | undefined => MENU_DELTA[key];
