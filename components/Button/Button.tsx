import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "primaryHero";
type ButtonSize = "sm" | "lg" | "icon" | "icon-sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "lg",
  children,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const classNames = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    fullWidth && styles["btn--full"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classNames} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
