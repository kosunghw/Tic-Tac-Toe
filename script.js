// Create a factory function to create Gameboard object
// Wrap inside an IIFE to create only one game board.
const Gameboard = (function () {
  let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  // function that shows the current board.
  //   const getBoard = () => gameBoard;

  function setBoard(row, column, marker) {
    gameBoard[row][column] = marker;
  }

  const getBoard = () => gameBoard;
  const resetBoard = () => {
    gameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  };

  return { getBoard, setBoard, resetBoard };
})();

// Player object
const createPlayer = function (name, marker) {
  return { name, marker };
};

// Game logics
const Game = function (player1, player2) {
  let player1Turn = true;
  let moveCount = 0;
  const play = function (row, column) {
    let board = Gameboard.getBoard();
    if (player1Turn) {
      if (board[row][column] === null) {
        Gameboard.setBoard(row, column, player1.marker);
        checkWinner(++moveCount, row, column, player2);
        player1Turn = !player1Turn;
      } else {
        console.log("Already taken! Place again");
      }
    } else {
      if (board[row][column] === null) {
        Gameboard.setBoard(row, column, player2.marker);
        checkWinner(++moveCount, row, column, player2);
        player1Turn = !player1Turn;
      } else {
        console.log("Already taken! Place again");
      }
    }
  };

  function resetGame() {
    Gameboard.resetBoard();
    moveCount = 0;
    player1Turn = true;
  }

  const checkWinner = function (moveCount, row, column, player) {
    let board = Gameboard.getBoard();
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

    // Announce draw if move count is greater than or equal to 9

    if (moveCount >= 9) {
      console.log(`DRAW`);
    }
  };

  return { play, reset: resetGame };
};

const displayController = (function () {
  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");
  const game = Game(player1, player2);
  let playerTurnToggle = true;

  // cache DOM
  const container = document.querySelector(".grid-container");
  const resetBtn = document.querySelector("#reset-button");
  const playerTurn = document.querySelector("#player-turn-message");
  const dialog = document.querySelector("#winner-display");

  container.addEventListener("click", addMarker);
  resetBtn.addEventListener("click", reset);

  function render() {
    board = Gameboard.getBoard();
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        // for each row and each column
        document.getElementById(`row${row}col${col}`).textContent =
          board[row][col];
      }
    }
  }

  function reset() {
    game.reset();
    playerTurnToggle = true;
    render();
  }

  function addMarker(event) {
    let target = event.target;

    switch (target.id) {
      case "row0col0":
        game.play(0, 0);
        render();
        break;

      case "row0col1":
        game.play(0, 1);
        render();
        break;

      case "row0col2":
        game.play(0, 2);
        render();
        break;

      case "row1col0":
        game.play(1, 0);
        render();
        break;

      case "row1col1":
        game.play(1, 1);
        render();
        break;

      case "row1col2":
        game.play(1, 2);
        render();
        break;

      case "row2col0":
        game.play(2, 0);
        render();
        break;

      case "row2col1":
        game.play(2, 1);
        render();
        break;

      case "row2col2":
        game.play(2, 2);
        render();
        break;
    }
  }
})();
