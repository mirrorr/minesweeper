"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: "flipTile",
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== " ") {
        return "This tile has already been flipped!";
      } else if (this._bombBoard[rowIndex][columnIndex] === "B") {
        this._playerBoard[rowIndex][columnIndex] = "B"; //place the bomb
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        if (this._playerBoard[rowIndex][columnIndex] === 0) {
          this.recursiveFlipping(rowIndex, columnIndex);
        }
      }
      this._numberOfTiles--;
    }
  }, {
    key: "recursiveFlipping",
    value: function recursiveFlipping(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._playerBoard.length;
      var numberOfColumns = this._playerBoard[0].length;
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          _this.flipTile(neighborRowIndex, neighborColumnIndex);
        }
      });
    }
  }, {
    key: "getNumberOfNeighborBombs",
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this2 = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this2._bombBoard[neighborRowIndex][neighborColumnIndex] === "B") {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  }, {
    key: "hasSafeTiles",
    value: function hasSafeTiles() {
      return this._numberOfBombs == this._numberOfTiles;
    }
  }, {
    key: "print",
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: "playerBoard",
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: "generatePlayerBoard",
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var rows = 0; rows < numberOfRows; rows++) {
        var row = [];
        for (var cols = 0; cols < numberOfColumns; cols++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }
  }, {
    key: "generateBombBoard",
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      if (numberOfBombs > numberOfRows * numberOfColumns) {
        console.log("Too many bombs. Please create new game");
        return false;
      }

      for (var rows = 0; rows < numberOfRows; rows++) {
        var row = [];
        for (var cols = 0; cols < numberOfColumns; cols++) {
          row.push(null);
        }
        board.push(row);
      }

      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        //So far, bomb will be also place on each other - todo fix
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomRowColumn = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomRowColumn] !== "B") {
          board[randomRowIndex][randomRowColumn] = "B";
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();