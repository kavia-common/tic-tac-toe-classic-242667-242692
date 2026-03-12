import React from "react";
import styles from "./GameHeader.module.css";

/**
 * Simple header block (title + subtitle).
 */
// PUBLIC_INTERFACE
export function GameHeader({ title, subtitle }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </div>
  );
}
