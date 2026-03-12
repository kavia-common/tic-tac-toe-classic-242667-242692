import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { GameHeader } from "./components/GameHeader/GameHeader";
import { GameStatus } from "./components/GameStatus/GameStatus";
import { RetroButton } from "./components/RetroButton/RetroButton";
import { Scoreboard } from "./components/Scoreboard/Scoreboard";
import { TicTacToeBoard } from "./features/ticTacToe/components/TicTacToeBoard/TicTacToeBoard";
import {
  computeGameState,
  createEmptyBoard,
} from "./features/ticTacToe/logic/gameLogic";

/**
 * App entrypoint for the Tic Tac Toe game.
 * Provides a retro-themed responsive UI with turn indicator, win/draw detection,
 * score tracking, and restart controls.
 */
// PUBLIC_INTERFACE
function App() {
  const [board, setBoard] = useState(() => createEmptyBoard());
  const [startingPlayer, setStartingPlayer] = useState("X");
  const [scores, setScores] = useState(() => ({ X: 0, O: 0, draws: 0 }));

  // Keep the existing template's theme mechanism, but default to "dark" for retro feel.
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const gameState = useMemo(() => computeGameState(board, startingPlayer), [
    board,
    startingPlayer,
  ]);

  useEffect(() => {
    // Update scores exactly once when a game ends.
    // We detect end state by watching winner/isDraw transitions.
    if (gameState.winner) {
      setScores((prev) => ({ ...prev, [gameState.winner]: prev[gameState.winner] + 1 }));
    } else if (gameState.isDraw) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.winner, gameState.isDraw]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    // Prevent moves if game is over or square already taken.
    if (gameState.winner || gameState.isDraw) return;
    if (board[index] !== null) return;

    setBoard((prev) => {
      const next = [...prev];
      next[index] = gameState.currentPlayer;
      return next;
    });
  };

  // PUBLIC_INTERFACE
  const restartGame = () => {
    // Alternate starting player each round for fairness.
    setStartingPlayer((prev) => (prev === "X" ? "O" : "X"));
    setBoard(createEmptyBoard());
  };

  // PUBLIC_INTERFACE
  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
    setStartingPlayer("X");
    setBoard(createEmptyBoard());
  };

  return (
    <div className="App">
      <main className="appShell">
        <header className="topBar">
          <GameHeader title="Tic Tac Toe" subtitle="Classic • Retro • 3×3" />
          <div className="topBarActions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              type="button"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        <section className="gameLayout" aria-label="Tic Tac Toe game">
          <Scoreboard scores={scores} />

          <GameStatus
            currentPlayer={gameState.currentPlayer}
            winner={gameState.winner}
            winningLine={gameState.winningLine}
            isDraw={gameState.isDraw}
          />

          <TicTacToeBoard
            board={board}
            onSquareClick={handleSquareClick}
            disabled={Boolean(gameState.winner || gameState.isDraw)}
            winningLine={gameState.winningLine}
          />

          <div className="controls" aria-label="Game controls">
            <RetroButton onClick={restartGame} variant="primary">
              Restart Round
            </RetroButton>
            <RetroButton onClick={resetScores} variant="secondary">
              Reset Scores
            </RetroButton>
          </div>

          <p className="hint" aria-live="polite">
            Tip: You can restart anytime. Starting player alternates each round.
          </p>
        </section>

        <footer className="footer">
          <span>Built with React • Keyboard & screen-reader friendly</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
