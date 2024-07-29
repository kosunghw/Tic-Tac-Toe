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
  const resetBoard = () => {
    gameBoard = [firstRow, secondRow, thirdRow];
  };

  return { getBoard, setBoard, resetBoard };
})();

// Player object
const createPlayer = function (name, marker) {
  return { name, marker };
};

const createGame = function (player1, player2) {
  let board = Gameboard.getBoard();
  let moveCount = 0;
  const play = function (player, row, column) {
    if (board[row][column] === null) {
      Gameboard.setBoard(row, column, player.marker);
    } else {
      console.log("Already taken! Place again");
    }
    moveCount++;
    checkWinner(moveCount, row, column, player);
  };

  const checkWinner = function (moveCount, row, column, player) {
    // Announce draw if move count is greater than or equal to 9
    if (moveCount >= 9) {
      console.log(`DRAW`);
    }

    // Check end conditions

    // Check column
    for (let i = 0; i < 3; i++) {
      if (board[row][i] !== player.marker) {
        break;
      }
      if (i === 2) {
        console.log(`${player.name} has won the game!`);
      }
    }

    // Check row
    for (let i = 0; i < 3; i++) {
      if (board[i][column] !== player.marker) {
        break;
      }
      if (i === 2) {
        console.log(`${player.name} has won the game!`);
      }
    }

    // Check diag
    if (row === column) {
      for (let i = 0; i < 3; i++) {
        if (board[i][i] !== player.marker) {
          break;
        }
        if (i === 2) {
          console.log(`${player.name} has won the game!`);
        }
      }
    }

    // Check anti-diag
    if (row + column === 2) {
      for (let i = 0; i < 3; i++) {
        if (board[i][2 - i] !== player.marker) {
          break;
        }
        if (i === 2) {
          console.log(`${player.name} has won the game!`);
        }
      }
    }
  };

  return { play };
};
