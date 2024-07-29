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
    checkWinner(row, column, moveCount);
  };

  const checkWinner = function (row, column, moveCount) {
    // Announce draw if moveCount is 9
    if (moveCount >= 9) {
      console.log(`It is a draw!`);
    }
    // check first row
    if (
      board[0][0] !== null &&
      board[0][0] === board[0][1] &&
      board[0][0] === board[0][2]
    ) {
      board[0][0] === player1.marker
        ? console.log(`${player1.name} won the game!`)
        : console.log(`${player2.name} won the game!`);
      Gameboard.resetBoard();
    } else if (
      board[1][0] !== null &&
      board[1][0] === board[1][1] &&
      board[1][0] === board[1][2]
    ) {
      // check second row
      board[1][0] === player1.marker
        ? console.log(`${player1.name} won the game!`)
        : console.log(`${player2.name} won the game!`);
      Gameboard.resetBoard();
    } else if (
      board[2][0] !== null &&
      board[2][0] === board[2][1] &&
      board[2][0] === board[2][2]
    ) {
      // check third row
      board[2][0] === player1.marker
        ? console.log(`${player1.name} won the game!`)
        : console.log(`${player2.name} won the game!`);
      Gameboard.resetBoard();
    } else if (
      // Check first column
      board[0][0] !== null &&
      board[0][0] === board[1][0] &&
      board[0][0] === board[2][0]
    ) {
      board[0][0] === player1.marker
        ? console.log(`${player1.name} won the game!`)
        : console.log(`${player2.name} won the game!`);
      Gameboard.resetBoard();
    } else if (
      board[0][1] !== null &&
      board[0][1] === board[1][1] &&
      board[0][1] === board[2][1]
    ) {
      // check second column
      board[0][1] === player1.marker
        ? console.log(`${player1.name} won the game!`)
        : console.log(`${player2.name} won the game!`);
      Gameboard.resetBoard();
    } else if (
      board[0][2] !== null &&
      board[0][2] === board[1][2] &&
      board[0][2] === board[2][2]
    ) {
      // check third column
      board[0][2] === player1.marker
        ? console.log(`${player1.name} won the game!`)
        : console.log(`${player2.name} won the game!`);
      Gameboard.resetBoard();
    } else if (board[1][1] !== null) {
      // Check diagonal
      if (
        (board[1][1] === board[0][0] && board[1][1] === board[2][2]) ||
        (board[1][1] === board[2][0] && board[1][1] === board[0][2])
      ) {
        board[1][1] === player1.marker
          ? console.log(`${player1.name} won the game!`)
          : console.log(`${player2.name} won the game!`);
        Gameboard.resetBoard();
      }
    }
  };

  return { play };
};
