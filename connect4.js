/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  for (let i = 0; i < HEIGHT; i++){ // start from column 0 to 5
    const arr = [] // create a new array called arr
    for (let j = 0; j < WIDTH; j++){ // start from row 0 to 6
      arr.push(null) // push null to arr
    }
    board.push(arr) // push arr to board
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  const htmlBoard = document.getElementById('board'); // get html element with the ID of "board"

  // TODO: add comment for this code
  // This creates the top row for user to click to drop the piece.
  const top = document.createElement("tr"); // create new "tr" element (row)
  top.setAttribute("id", "column-top");  // set its ID to "column-top" (where player clicks to drop the piece)
  top.addEventListener("click", handleClick); // add event listener to handle user clicks

  for (let x = 0; x < WIDTH; x++) { // start from 0 to 6
    const headCell = document.createElement("td"); // create new "td" elemenet (column)
    headCell.setAttribute("id", x); // set its ID to x
    top.append(headCell); // append it to "tr" element with the ID of "column-top"
  }
  htmlBoard.append(top); // append the "tr" element to the board

  // TODO: add comment for this code
  // This creates the slots for the piece to land in.
  for (let y = 0; y < HEIGHT; y++) { // start from 0 to 5
    const row = document.createElement("tr"); // create new "tr" element (row slot)
    for (let x = 0; x < WIDTH; x++) { // start from 0 to 6
      const cell = document.createElement("td"); // create new "td" element (each slot)
      cell.setAttribute("id", `${y}-${x}`); // set its id to y-x ex. 0-0, 0-1, 0-2
      row.append(cell); // append each slot to the row slot
    }
    htmlBoard.append(row); // append row slot to the board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y  = HEIGHT-1; y >= 0; y--){ // start from 5 to 0
    if (!board[y][x]){ // if board is not equals to null
      return y; // return y (empty slot in that column)
    }
  }
  return null; // return null (all slot is taken in that column)
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div') // create new "div" element
  piece.className = `piece p${currPlayer}` // set its class to piece p1 OR p2
  

  const cell = document.getElementById(`${y}-${x}`); // get element with the ID of y-x *this will be called after findSpotForCol() to get an empty y spot
  cell.append(piece); // append piece to the spot (red/blue pieces)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer // set the spot to current player
  placeInTable(y, x); // place the piece in the slot

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every((row) => row.every((cell) => cell)) ){ // if every slot is filled with player's pieces (if there's still null slot then this returns false)
    return endGame("Tie!") // alert Tie!
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1 // switch player's turn 1 -> 2 and 2 -> 1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
