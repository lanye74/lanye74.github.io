import BoardManager from "./BoardManager.js";
// import FEN from "./fen.js";



const boardElem = document.getElementById("board");
const board = new BoardManager(boardElem);


board.loadFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");



// @ts-ignore
window.board = board;