import React from "react";
import styles from "./RetroButton.module.css";

/**
 * Reusable button with retro styling.
 */
// PUBLIC_INTERFACE
export function RetroButton({ children, onClick, variant = "primary", disabled = false }) {
  const className =
    variant === "secondary" ? `${styles.btn} ${styles.secondary}` : `${styles.btn} ${styles.primary}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled} type="button">
      {children}
    </button>
  );
}
