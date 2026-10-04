import { createContext, useCallback, useContext, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { menuKeyDelta, wrapIndex } from "../../lib/keyboardNav";
import { Icon } from "../Icon";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Accordion.css";

type AccordionContextValue = { openValue: string | null; toggle: (value: string) => void };

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem precisa estar dentro de <Accordion>");
  return ctx;
}

export type AccordionProps = SpacingProps & {
  /** value do item que começa aberto; omitido = todos fechados. */
  defaultValue?: string;
  children: ReactNode;
};

export function Accordion({ defaultValue, children, ...rest }: AccordionProps) {
  const [openValue, setOpenValue] = useState<string | null>(defaultValue ?? null);
  const [spacing, domRest] = splitSpacingProps(rest);
  const listRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback((value: string) => setOpenValue((v) => (v === value ? null : value)), []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const delta = menuKeyDelta(e.key);
    if (delta === undefined || !listRef.current) return;
    const triggers = Array.from(listRef.current.querySelectorAll<HTMLButtonElement>(".accordion-trigger:not(:disabled)"));
    const currentIndex = triggers.indexOf(document.activeElement as HTMLButtonElement);
    if (currentIndex === -1) return;
    e.preventDefault();
    triggers[wrapIndex(currentIndex, delta, triggers.length)].focus();
  };

  return (
    <AccordionContext.Provider value={{ openValue, toggle }}>
      <div className="accordion" ref={listRef} onKeyDown={onKeyDown} style={spacingStyle(spacing)} {...domRest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export type AccordionItemProps = {
  value: string;
  title: string;
  disabled?: boolean;
  children: ReactNode;
};

export function AccordionItem({ value, title, disabled = false, children }: AccordionItemProps) {
  const { openValue, toggle } = useAccordionContext();
  const open = openValue === value;
  const triggerId = `acc-trigger-${value}`;
  const panelId = `acc-panel-${value}`;

  return (
    <div className="accordion-item">
      <h3 className="accordion-heading">
        <button
          type="button"
          id={triggerId}
          className="accordion-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          disabled={disabled}
          onClick={() => toggle(value)}
        >
          <span>{title}</span>
          <Icon name="chevron-down" size="sm" />
        </button>
      </h3>
      <div role="region" id={panelId} aria-labelledby={triggerId} className="accordion-panel" hidden={!open}>
        {children}
      </div>
    </div>
  );
}
