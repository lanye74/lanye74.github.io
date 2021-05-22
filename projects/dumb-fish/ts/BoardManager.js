import FEN from "./fen.js";
export default class BoardManager {
    constructor(board, fen) {
        this.board = board;
        this.FEN = fen;
        this.initializeLetterPieceMap();
    }
    clear() {
        this.board.innerHTML = "";
    }
    initializeLetterPieceMap() {
        this.letterPieceMap = new Map();
        this.letterPieceMap.set("p", "pawn");
        this.letterPieceMap.set("n", "knight");
        this.letterPieceMap.set("b", "bishop");
        this.letterPieceMap.set("r", "rook");
        this.letterPieceMap.set("q", "queen");
        this.letterPieceMap.set("k", "king");
    }
    makeMove(coords) {
        const coordsArr = coords.match(/.{2}/g);
        const fromPosition = coordsArr[0].split(""); // "e", "2"
        const adjustedFrom = [
            parseInt(fromPosition[0], 18) - 10,
            parseInt(fromPosition[1]) - 1
        ];
        const toPosition = coordsArr[1].split(""); // "e", "4"
        const adjustedTo = [
            parseInt(toPosition[0], 18) - 10,
            parseInt(toPosition[1]) - 1
        ];
        console.log(adjustedFrom, adjustedTo);
    }
    loadFEN(loadFrom) {
        this.clear();
        let fen;
        if (typeof loadFrom === "string") {
            fen = new FEN(loadFrom);
        }
        else if (typeof loadFrom === "object") {
            fen = loadFrom;
        }
        else {
            fen = this.FEN;
        }
        fen = fen;
        this.FEN = fen;
        const board = fen.expandFEN();
        board.forEach((rank, rankNum) => {
            rank.forEach((square, squareIndex) => {
                const piece = this.pieceToElem(square, squareIndex, 8 - rankNum // from white's perspective
                );
                if (piece)
                    this.board.appendChild(piece);
            });
        });
    }
    pieceToElem(letter, file, rank) {
        const pieceElem = document.createElement("piece");
        let fileNumber = (file + 10).toString(18); // convert to letter
        if (letter === " ") {
            return null;
        }
        pieceElem.classList.add((letter.toLowerCase() === letter) ? "black" : "white");
        pieceElem.classList.add(this.letterPieceMap.get(letter.toLowerCase()));
        pieceElem.classList.add(`${fileNumber}${rank}`);
        return pieceElem;
    }
}
