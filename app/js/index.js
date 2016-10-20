
const electron = require('electron');

const { ipcRenderer } = electron;

const buttons = document.querySelectorAll('.game-button');

const getDefaultBoard = () => [['', '', ''], ['', '', ''], ['', '', '']];

let isX = true;

let board = getDefaultBoard();
let moveCount = 0;

const reset = () => {
  moveCount = 0;
  board = getDefaultBoard();
  buttons.forEach((button) => { button.innerText = ''; });
};

const checkForWinningBoard = (board, moveCount) => {

  // Checking rows
  for (let x = 0; x < board.length; x++) {
    let row = board[x];
    let current = row[0];
    for (let i = 0; i < row.length; i++) {
      if (row[i] !== current || row[i] === '') {
        break;
      } else if (i === board.length - 1) {
        return true;
      }
    }
  }

  // Checking columns
  for (let i = 0; i < board.length; i++) {
    let current = board[0][i];
    for (let x = 0; x < board.length; x++) {
      if (board[x][i] !== current || board[x][i] === '') {
        break;
      } else if (x === board.length - 1) {
        return true;
      }
    }
  }

  // Check diagnol
  let current = board[0][0];
  for (let i = 1; i < board.length; i++) {
    if (current !== board[i][i] || board[i][i] === '') {
      break;
    } else if (i === board.length - 1) {
      return true;
    }
  }

  current = board[0][board.length - 1];
  for (let i = board.length -2; i >= 0; i--) {
    if (current !== board[board.length - (1 + i)][i] || board[board.length - (1 + i)][i] === '') {
      break;
    } else if (i === 0) {
      return true;
    }
  }

  return false;
};

const getArrIndex = (button) => {
  let data = button.srcElement.dataset.buttonLocation;

  let x = parseInt(data.split('-')[0], 10);
  let y = parseInt(data.split('-')[1], 10);

  return { x, y };
};

const buttonChosen = (button) => {
  if (button.srcElement.innerText !== '') return;

  const loc = getArrIndex(button);

  if (isX) {
    button.srcElement.innerText = 'X';
    board[loc.x][loc.y] = 'X';
  } else {
    button.srcElement.innerText = 'O';
    board[loc.x][loc.y] = 'O';
  }

  moveCount++;

  if (checkForWinningBoard(board)) {
    alert(`${isX ? 'X' : 'O'} won!`);
    reset();
  } else if (moveCount === 9) {
    alert('It\'s a tie!');
    reset();
  }

  isX = !isX;
};

buttons.forEach((button) => button.addEventListener('click', buttonChosen));