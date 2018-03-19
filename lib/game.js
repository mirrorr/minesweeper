"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit

var _board = require("./board");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new _board.Board(numberOfRows, numberOfColumns, numberOfBombs);
    this._t0 = this.clock();
  }

  _createClass(Game, [{
    key: "clock",
    value: function clock(start) {
      if (!start) return process.hrtime();
      var end = process.hrtime(start);
      return Math.round(end[0] * 1000 + end[1] / 1000000);
    }
  }, {
    key: "playMove",
    value: function playMove(rowIndex, columnIndex) {
      if (this._board.playerBoard[rowIndex][columnIndex] === "*") {
        console.log("Cant flip - tile is blocked");
        return;
      }
      this._board.flipTile(rowIndex, columnIndex);
      if (this._board.playerBoard[rowIndex][columnIndex] === "B") {
        console.log("game over!");
        console.log("Game Time:" + this.clock(this._t0) + "ms");
        this._board.print();
      } else if (this._board.hasSafeTiles()) {
        console.log("game won!");
        console.log("tiles left:" + this._board._numberOfTiles);
        console.log("bombs left:" + this._board._numberOfBombs);
        console.log("Game Time:" + this.clock(this._t0) + "ms");

        this._board.print();
      } else {
        console.log("Current board:");
        this._board.print();
      }
    }
  }, {
    key: "block",
    value: function block(rowIndex, columnIndex) {
      this._board.playerBoard[rowIndex][columnIndex] = "*";
      this._board.print();
    }
  }, {
    key: "unblock",
    value: function unblock(rowIndex, columnIndex) {
      this._board.playerBoard[rowIndex][columnIndex] = " ";
      this._board.print();
    }
  }]);

  return Game;
}();

var game = new Game(3, 3, 0);
game.playMove(1, 1);