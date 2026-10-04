import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Input } from "./Input";
import "./Field.css";

export const PasswordInput = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, "type">>(
  function PasswordInput(props, ref) {
    const [visible, setVisible] = useState(false);
    return (
      <Input
        ref={ref}
        type={visible ? "text" : "password"}
        trailingAction={
          <Button
            variant="ghost"
            icon
            size="sm"
            className="trail"
            aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
            onClick={() => setVisible((v) => !v)}
          >
            <Icon name={visible ? "eye-off" : "eye"} size="sm" />
          </Button>
        }
        {...props}
      />
    );
  },
);
