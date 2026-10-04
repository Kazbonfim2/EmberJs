import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "../../lib/classnames";
import { Button } from "../Button";
import { Icon, type IconName } from "../Icon";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Modal.css";

export type ModalVariant = "default" | "warn" | "danger";

export type ModalProps = SpacingProps & {
  open: boolean;
  onClose: () => void;
  title: string;
  titleId: string;
  variant?: ModalVariant;
  /** Ícone no cabeçalho; quando omitido, mostra o X de fechar (padrão dos modais simples). */
  icon?: IconName;
  children: ReactNode;
  footer?: ReactNode;
};

export function Modal({ open, onClose, title, titleId, variant = "default", icon, children, footer, ...rest }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [spacing] = splitSpacingProps(rest);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={cx("modal", variant !== "default" && `is-${variant}`)}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      style={spacingStyle(spacing)}
    >
      <div className="modal-head">
        {icon && <Icon name={icon} />}
        <h3 id={titleId}>{title}</h3>
        {!icon && (
          <Button variant="ghost" icon size="sm" aria-label="Fechar" onClick={onClose}>
            <Icon name="x" size="sm" />
          </Button>
        )}
      </div>
      <div className="modal-body">{children}</div>
      {footer && <div className="modal-foot">{footer}</div>}
    </dialog>
  );
}
