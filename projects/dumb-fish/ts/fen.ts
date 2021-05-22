export default class FEN {
	FEN: string;
	FENProperties: string[];

	constructor(fen: string) {
		this.FEN = fen;
		this.FENProperties = this.FEN.split(" ");
	}

	compressBoard(board: string[][]) {
		let fen = "";
	}

	expandFEN() { // this is so horrible
		const boardArray: string[][] = [];

		const FENstate = this.boardState;
		const FENranks = FENstate.split("/");


		for(let i = 0; i < 8; i++) {
			boardArray.push([]);

			const FENrank = FENranks[i];
			const rankParts = FENrank.split("");

			// this can return P, n, K, 3, etc

			for(let j = 0; j < rankParts.length; j++) {
				const rankPart = rankParts[j];
				
				if(isNaN(parseInt(rankPart))) {
					// If rank "part" is a piece

					boardArray[i].push(rankPart); // add pawn to the board
				} else { // skip spaces time!
					// damn it
					// more nested for loops

					for(let k = 0; k < parseInt(rankPart); k++) {
						boardArray[i].push(" ");
					}
				}
			}
		}


		return boardArray;
	}

	makeMove() {
		// manipulate board, then recalculate fen
	}



	get boardState() {
		return this.FENProperties[0];
	}

	get activeColor() {
		return this.FENProperties[1];
	}

	get castlingState() {
		return this.FENProperties[2];
	}

	get enPassantSquare() {
		return this.FENProperties[3];
	}

	get halfMoveClock() {
		return this.FENProperties[4];
	}

	get fullMoveClock() {
		return this.FENProperties[5];
	}
}