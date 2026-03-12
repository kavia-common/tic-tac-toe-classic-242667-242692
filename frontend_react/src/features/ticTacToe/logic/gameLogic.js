/**
 * Tic Tac Toe game logic (framework-agnostic).
 * Kept separate for scalability/testing and to keep UI components simple.
 */

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

// PUBLIC_INTERFACE
export function createEmptyBoard() {
  /** Create a new empty 3x3 board represented as a flat array of 9 cells. */
  return Array(9).fill(null);
}

function getWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningLine: line };
    }
  }
  return { winner: null, winningLine: null };
}

function countMarks(board) {
  let x = 0;
  let o = 0;
  for (const cell of board) {
    if (cell === "X") x += 1;
    if (cell === "O") o += 1;
  }
  return { x, o };
}

function getCurrentPlayer(board, startingPlayer) {
  // Starting player defines parity: if starting is X, X plays when x===o; else O plays when x===o.
  const { x, o } = countMarks(board);
  const total = x + o;
  if (total === 0) return startingPlayer;

  // If starting is X: sequence X,O,X,O... => when x===o => X's turn else O's.
  // If starting is O: sequence O,X,O,X... => when x===o => O's turn else X's.
  const parityPlayer = x === o ? startingPlayer : startingPlayer === "X" ? "O" : "X";
  return parityPlayer;
}

// PUBLIC_INTERFACE
export function computeGameState(board, startingPlayer = "X") {
  /**
   * Compute derived game state:
   * - currentPlayer: "X" | "O"
   * - winner: "X" | "O" | null
   * - winningLine: number[] | null
   * - isDraw: boolean
   */
  const { winner, winningLine } = getWinner(board);
  const isDraw = !winner && board.every((c) => c !== null);
  const currentPlayer = winner || isDraw ? null : getCurrentPlayer(board, startingPlayer);

  return {
    currentPlayer,
    winner,
    winningLine,
    isDraw,
  };
}
