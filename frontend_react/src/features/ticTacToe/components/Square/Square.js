import React from "react";
import styles from "./Square.module.css";

/**
 * Single square for the Tic Tac Toe board.
 */
// PUBLIC_INTERFACE
export function Square({ value, onClick, disabled, index, highlight }) {
  const ariaLabel = value ? `Square ${index + 1}, ${value}` : `Square ${index + 1}, empty`;

  return (
    <button
      type="button"
      className={`${styles.square} ${highlight ? styles.highlight : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span className={styles.mark} data-mark={value ?? "empty"}>
        {value}
      </span>
    </button>
  );
}
