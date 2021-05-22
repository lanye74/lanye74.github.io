import {PieceFile, PieceRank} from "./interfaces.js";



export default class PieceSquare {
	x: PieceFile;
	y: PieceRank;

	constructor(location: string) {
		this.setLocation(location);
	}

	setLocation(location: string) {
		this.x = <PieceFile>location.split("")[0];
		this.y = <PieceRank>location.split("")[1];
	}

	get coords() {
		return this.x + this.y;
	}
}