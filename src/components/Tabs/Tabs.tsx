import { createContext, useContext, useRef, type KeyboardEvent, type ReactNode } from "react";
import { tabKeyDelta, wrapIndex } from "../../lib/keyboardNav";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Tabs.css";

type TabsContextValue = { value: string; onChange: (value: string) => void };

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab/TabPanel precisam estar dentro de <Tabs>");
  return ctx;
}

export type TabsProps = { value: string; onChange: (value: string) => void; children: ReactNode };

export function Tabs({ value, onChange, children }: TabsProps) {
  return <TabsContext.Provider value={{ value, onChange }}>{children}</TabsContext.Provider>;
}

export type TabListProps = SpacingProps & { children: ReactNode; "aria-label": string };

export function TabList({ children, "aria-label": ariaLabel, ...rest }: TabListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [spacing] = splitSpacingProps(rest);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const delta = tabKeyDelta(e.key);
    if (delta === undefined || !listRef.current) return;
    const tabs = Array.from(listRef.current.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'));
    const currentIndex = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (currentIndex === -1) return;
    e.preventDefault();
    const next = tabs[wrapIndex(currentIndex, delta, tabs.length)];
    next.focus();
    next.click();
  };

  return (
    <div className="tabs" role="tablist" aria-label={ariaLabel} ref={listRef} onKeyDown={handleKeyDown} style={spacingStyle(spacing)}>
      {children}
    </div>
  );
}

export type TabProps = SpacingProps & { value: string; disabled?: boolean; children: ReactNode };

export function Tab({ value, disabled, children, ...rest }: TabProps) {
  const ctx = useTabsContext();
  const selected = ctx.value === value;
  const [spacing] = splitSpacingProps(rest);
  return (
    <button
      id={`tab-${value}`}
      role="tab"
      type="button"
      aria-selected={selected}
      aria-controls={`panel-${value}`}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      className="tab"
      onClick={() => ctx.onChange(value)}
      style={spacingStyle(spacing)}
    >
      {children}
    </button>
  );
}

export type TabPanelProps = SpacingProps & { value: string; children: ReactNode };

export function TabPanel({ value, children, ...rest }: TabPanelProps) {
  const ctx = useTabsContext();
  const selected = ctx.value === value;
  const [spacing] = splitSpacingProps(rest);
  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className="tabpanel"
      hidden={!selected}
      style={spacingStyle(spacing)}
    >
      {children}
    </div>
  );
}
