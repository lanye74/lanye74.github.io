import FEN from "./fen.js";



export default class BoardManager {
	board: HTMLElement;
	FEN: FEN;
	letterPieceMap: Map<string, string>;

	constructor(board: HTMLElement, fen?: FEN) {
		this.board = board;
		this.FEN = fen;

		this.initializeLetterPieceMap();
	}

	clear() {
		this.board.innerHTML = "";
	}

	private initializeLetterPieceMap() {
		this.letterPieceMap = new Map<string, string>();
		this.letterPieceMap.set("p", "pawn");
		this.letterPieceMap.set("n", "knight");
		this.letterPieceMap.set("b", "bishop");
		this.letterPieceMap.set("r", "rook");
		this.letterPieceMap.set("q", "queen");
		this.letterPieceMap.set("k", "king");
	}

	makeMove(coords: string) {
		const coordsArr: string[] = coords.match(/.{2}/g);

		const fromPosition: string[] = coordsArr[0].split(""); // "e", "2"
		const adjustedFrom: number[] = [
			parseInt(fromPosition[0], 18) - 10,
			parseInt(fromPosition[1]) - 1
		];

		const toPosition: string[] = coordsArr[1].split(""); // "e", "4"
		const adjustedTo: number[] = [
			parseInt(toPosition[0], 18) - 10,
			parseInt(toPosition[1]) - 1
		];

		console.log(adjustedFrom, adjustedTo)
	}

	loadFEN(loadFrom?: FEN | string) {
		this.clear();

		let fen: FEN | string;

		if(typeof loadFrom === "string") {
			fen = new FEN(<string>loadFrom);
		} else if(typeof loadFrom === "object") {
			fen = loadFrom;
		} else {
			fen = this.FEN;
		}

		fen = <FEN>fen;
		this.FEN = fen;


		const board = fen.expandFEN();

		board.forEach((rank: string[], rankNum) => {
			rank.forEach((square: string, squareIndex) => {
				const piece = this.pieceToElem(
					square,
					squareIndex,
					8 - rankNum // from white's perspective
				);

				if(piece) this.board.appendChild(piece);
			});
		});
	}

	pieceToElem(letter: string, file: number, rank: number) {
		const pieceElem = document.createElement("piece");
		let fileNumber = (file + 10).toString(18); // convert to letter

		if(letter === " ") {
			return null;
		}

		pieceElem.classList.add((letter.toLowerCase() === letter) ? "black" : "white");
		pieceElem.classList.add(this.letterPieceMap.get(letter.toLowerCase()));

		pieceElem.classList.add(`${fileNumber}${rank}`);


		return pieceElem;
	}
}