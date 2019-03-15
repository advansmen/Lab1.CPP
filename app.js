const Width = 80;
const Height = 20;

function createBoard() {
  const board = [];
  for (let i = 0; i < Height; i++) {
    board[i] = [];
    for (let j = 0; j < Width; j++) {
      board[i][j] = 0;
    }
  }
  return board;
}

function randomBoard(board) {
  for (let i = 0; i < Height; i++) {
    for (let j = 0; j < Width; j++) {
      if (Math.random() > 0.5) {
        board[i][j] = 1;
      } else {
        board[i][j] = 0;
      }
    }
  }
}

function newGeneration(board) {
  const newBoard = createBoard();
  for (let i = 0; i < Height; i++) {
    for (let j = 0; j < Width; j++) {
      if (isAlive(board, i, j)) {
        newBoard[i][j] = 1;
      } else {
        newBoard[i][j] = 0;
      }
    }
  }
  return newBoard;
}

function isAlive(board, i, j) {
  let count = get(board, i - 1, j - 1) + get(board, i - 1, j) + get(board, i - 1, j + 1) +
              get(board, i    , j - 1) + 0                    + get(board, i    , j + 1) +
              get(board, i + 1, j - 1) + get(board, i + 1, j) + get(board, i + 1, j + 1);

  if (board[i][j] == 1) {
    return count >= 2 && count <= 3;
  } else {
    return count == 3;
  }
}

function get(board, i, j) {
  if (i < 0 || j < 0 || i >= Height || j >= Width) {
    return 0;
  }

  return board[i][j];
}

function printBoard(board) {
  console.clear();
  for (let i = 0; i < Height; i++) {
    for (let j = 0; j < Width; j++) {
      if (board[i][j] == 1) {
        process.stdout.write('#');
      } else {
        process.stdout.write(' ');
      }
    }
    process.stdout.write('\n');
  }
}

let board = createBoard();
randomBoard(board);
setInterval(function () {
  board = newGeneration(board);
  printBoard(board);
}, 100);
