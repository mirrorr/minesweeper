// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit

import {Board} from './board'

class Game{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    this._t0 = this.clock();
  }
  clock(start) {
    if ( !start ) return process.hrtime();
    var end = process.hrtime(start);
    return Math.round((end[0]*1000) + (end[1]/1000000));
  }
  playMove(rowIndex,columnIndex){
    if(this._board.playerBoard[rowIndex][columnIndex] === "*"){
      console.log("Cant flip - tile is blocked");
      return;
    }
    this._board.flipTile(rowIndex,columnIndex);
    if(this._board.playerBoard[rowIndex][columnIndex] === "B"){
      console.log("game over!");
      console.log("Game Time:" + (this.clock(this._t0)) + "ms");
      this._board.print();
    } else if (this._board.hasSafeTiles()) {
      console.log("game won!");
      console.log("tiles left:" + this._board._numberOfTiles);
      console.log("bombs left:" + this._board._numberOfBombs);
      console.log("Game Time:" + (this.clock(this._t0)) + "ms");

      this._board.print();
    } else {
      console.log("Current board:");
      this._board.print();
    }
  }
  block(rowIndex,columnIndex){
    this._board.playerBoard[rowIndex][columnIndex] = "*";
    this._board.print();
  }
  unblock(rowIndex,columnIndex){
    this._board.playerBoard[rowIndex][columnIndex] = " ";
    this._board.print();
  }
}

let game = new Game(3,3,0);
game.playMove(1,1);
