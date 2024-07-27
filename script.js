// Create a factory function to create Gameboard object
// Wrap inside an IIFE to create only one game board.
const Gameboard = (function () {
  let firstRow = [null, null, null];
  let secondRow = [null, null, null];
  let thirdRow = [null, null, null];
  let gameBoard = [firstRow, secondRow, thirdRow];

  // function that shows the current board.
  //   const getBoard = () => gameBoard;

  function setBoard(row, column, marker) {
    gameBoard[row][column] = marker;
  }

  const getBoard = () => gameBoard;

  return { getBoard, setBoard };
})();

// Player object
const createPlayer = function (name, marker) {
  return { name, marker };
};

const createGame = function (player1, player2) {
  let board = Gameboard.getBoard();
  const play = function (player, row, column) {
    if (board[row][column] === null) {
      Gameboard.setBoard(row, column, player.marker);
    } else {
      console.log("Already taken! Place again");
    }
    checkWinner();
  };

  const announceWinner = function () {
    console.log("Somebody won");
  };

  const checkWinner = function () {
    if (checkRows() || checkCols() || checkDiag()) {
      announceWinner();
    }
  };

  const checkRows = function () {
    // check first row
    if (
      board[0][0] !== null &&
      board[0][0] === board[0][1] &&
      board[0][0] === board[0][2]
    ) {
      return true;
    } else if (
      board[1][0] !== null &&
      board[1][0] === board[1][1] &&
      board[1][0] === board[1][2]
    ) {
      // check second row
      return true;
    } else if (
      board[2][0] !== null &&
      board[2][0] === board[2][1] &&
      board[2][0] === board[2][2]
    ) {
      // check third row
      return true;
    }
    return false;
  };
  const checkCols = function () {
    // check first column
    if (
      board[0][0] !== null &&
      board[0][0] === board[1][0] &&
      board[0][0] === board[2][0]
    ) {
      return true;
    } else if (
      board[0][1] !== null &&
      board[0][1] === board[1][1] &&
      board[0][1] === board[2][1]
    ) {
      // check second column
      return true;
    } else if (
      board[0][2] !== null &&
      board[0][2] === board[1][2] &&
      board[0][2] === board[2][2]
    ) {
      // check third column
      return true;
    }
    return false;
  };
  const checkDiag = function () {
    // check first diag
    if (board[1][1] !== null) {
      if (
        (board[1][1] === board[0][0] && board[1][1] === board[2][2]) ||
        (board[1][1] === board[2][0] && board[1][1] === board[0][2])
      ) {
        return true;
      }
    }
    return false;
  };

  return { play };
};
