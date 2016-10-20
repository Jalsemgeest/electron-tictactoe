const getDefaultBoard = () => [['', '', ''], ['', '', ''], ['', '', '']];

const checkForWinningBoard = (board, moveCount) => {
  let isWinning = false;

  let current = '';

  // Checking rows
  for (let i = 0; i < board.length; i++) {
    current = board[i][0];
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] !== current) break;
      if (j === board.length) {
        return true;
      }
    }
  }

  // Checking columns
  for (let i = 0; i < board.length; i++) {
    current = board[0][i];
    for (let j = 0; j < board.length; j++) {
      if (board[j][i] !== current) break;
      if (j === board.length) {
        return true;
      }
    }
  }

  return false;
};

export {
  getDefaultBoard,
  checkForWinningBoard,
};

export default { default: () => {} };
