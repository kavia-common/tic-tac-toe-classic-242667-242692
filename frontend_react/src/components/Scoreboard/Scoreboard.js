import React from "react";
import styles from "./Scoreboard.module.css";

/**
 * Displays session scores (X, O, Draws).
 */
// PUBLIC_INTERFACE
export function Scoreboard({ scores }) {
  return (
    <div className={styles.board} aria-label="Scoreboard">
      <div className={styles.item}>
        <div className={styles.label}>X</div>
        <div className={styles.value}>{scores.X}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>Draws</div>
        <div className={styles.value}>{scores.draws}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>O</div>
        <div className={styles.value}>{scores.O}</div>
      </div>
    </div>
  );
}
