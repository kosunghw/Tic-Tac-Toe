// Create a factory function to create Gameboard object
// Wrap inside an IIFE to create only one game board.
const Gameboard = (function () {
  let firstRow = [null, null, null];
  let secondRow = [null, null, null];
  let thirdRow = [null, null, null];
  let gameBoard = [firstRow, secondRow, thirdRow];

  // function that shows the current board.
  //   const getBoard = () => gameBoard;

  return { gameBoard };
})();

// Player object
const createPlayer = function (name, marker) {
  return { name, marker };
};
