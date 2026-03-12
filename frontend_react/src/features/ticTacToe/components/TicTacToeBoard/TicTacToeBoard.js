import React from "react";
import styles from "./TicTacToeBoard.module.css";
import { Square } from "../Square/Square";

/**
 * 3x3 board UI.
 */
// PUBLIC_INTERFACE
export function TicTacToeBoard({ board, onSquareClick, disabled, winningLine }) {
  return (
    <div className={styles.boardWrap}>
      <div className={styles.board} role="grid" aria-label="Tic Tac Toe board">
        {board.map((value, idx) => {
          const isWinning = Array.isArray(winningLine) ? winningLine.includes(idx) : false;

          return (
            <Square
              key={idx}
              value={value}
              onClick={() => onSquareClick(idx)}
              disabled={disabled || value !== null}
              index={idx}
              highlight={isWinning}
            />
          );
        })}
      </div>
    </div>
  );
}
