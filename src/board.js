export class Board{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard(){
    return this._playerBoard;
  }
  flipTile(rowIndex, columnIndex){
    if(this._playerBoard[rowIndex][columnIndex] !== " "){
      return "This tile has already been flipped!";
    } else if (this._bombBoard[rowIndex][columnIndex] === "B"){
      this._playerBoard[rowIndex][columnIndex] = "B"; //place the bomb
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex,columnIndex);
      if(this._playerBoard[rowIndex][columnIndex] === 0){
        this.recursiveFlipping(rowIndex,columnIndex);
      }
    }
    this._numberOfTiles--;
  }
  recursiveFlipping(rowIndex,columnIndex){
    const neighborOffsets = [
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1],
    ];
    const numberOfRows = this._playerBoard.length;
    const numberOfColumns = this._playerBoard[0].length;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
        this.flipTile(neighborRowIndex,neighborColumnIndex);
      }
    });
  }
  getNumberOfNeighborBombs(rowIndex, columnIndex){
    const neighborOffsets = [
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1],
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
        if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === "B"){
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles(){
    return (this._numberOfBombs == this._numberOfTiles);
  }

  print(){
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns){
    let board = [];
    for(let rows = 0; rows < numberOfRows; rows++){
      let row = [];
      for(let cols = 0; cols < numberOfColumns; cols++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    if (numberOfBombs > numberOfRows * numberOfColumns){
      console.log("Too many bombs. Please create new game");
      return false;
    }

    for(let rows = 0; rows < numberOfRows; rows++){
      let row = [];
      for(let cols = 0; cols < numberOfColumns; cols++) {
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;
    while(numberOfBombsPlaced < numberOfBombs){
      //So far, bomb will be also place on each other - todo fix
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomRowColumn = Math.floor(Math.random() * numberOfColumns);
      if(board[randomRowIndex][randomRowColumn] !== "B"){
        board[randomRowIndex][randomRowColumn] = "B";
        numberOfBombsPlaced++;
      }
    }
    return board;
  }
}
