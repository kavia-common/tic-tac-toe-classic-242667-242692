import React, { useMemo } from "react";
import styles from "./GameStatus.module.css";

/**
 * Shows current turn, win/draw state, and a subtle hint for the winning line.
 */
// PUBLIC_INTERFACE
export function GameStatus({ currentPlayer, winner, winningLine, isDraw }) {
  const message = useMemo(() => {
    if (winner) return `Player ${winner} wins!`;
    if (isDraw) return "It's a draw!";
    return `Turn: Player ${currentPlayer}`;
  }, [currentPlayer, winner, isDraw]);

  const secondary = useMemo(() => {
    if (!winner || !winningLine) return null;
    const [a, b, c] = winningLine.map((n) => n + 1);
    return `Winning line: squares ${a}, ${b}, ${c}`;
  }, [winner, winningLine]);

  return (
    <div className={styles.wrap} aria-live="polite" aria-atomic="true">
      <div className={styles.message}>
        <span className={styles.badge} data-state={winner ? "win" : isDraw ? "draw" : "turn"}>
          {winner ? "WIN" : isDraw ? "DRAW" : "TURN"}
        </span>
        <span className={styles.text}>{message}</span>
      </div>
      {secondary ? <div className={styles.secondary}>{secondary}</div> : null}
    </div>
  );
}
