class Tetrimino {
	constructor(sprite, name, matrix, pos, size) {
		this.sprite = sprite;

		this.name = name;

		this.matrix = matrix;
		this.pos = pos;

		this.size = size;
	}

	draw() {
		this.matrix.forEach((row, yOffset) => {
			row.forEach((piece, xOffset) => {
				if(piece === "_") {return}

				ctx.drawImage(this.sprite,
					(xOffset + this.pos.x) * this.size, // offset to piece position
					(yOffset + this.pos.y.whole) * this.size
				);
			});
		});
	}

	handleCollisions(gameMatrix, pieces) {
		// Now, using the our current position and matrix, get all of the piece positions.

		let piecePositions = [];

		this.matrix.forEach((fullRow, yOffset) => {
			let rowMatrix = [];

			fullRow.forEach((piece, xOffset) => {
				if(piece === "_") {return} // :thonk:

				let coords = [(xOffset + this.pos.x) , (yOffset + this.pos.y.whole)];
				rowMatrix.push(coords);
			});

			piecePositions.push(rowMatrix);
		});

		piecePositions = piecePositions.filter(row => row != "");

		// With our current position in mind, check for collisions- and push ourself into the matrix, if necessary.

		let gMArray = gameMatrix.contents.split("|").reduce((newArr, element, i) => {
			let subArr = element.split("");
			newArr[i] = subArr;

			return newArr;
		}, []);

		let collided = false;

		piecePositions.forEach(row => {
			row.forEach(coord => {
				if(coord[1] >= 23 || gMArray[coord[1]][coord[0]] !== "_") {collided = true;}
			});
		});

		if(collided) {
			console.log("collided", this.name)
			piecePositions.forEach(row => {
				row.forEach(coord => {
					gMArray[coord[1] - 1][coord[0]] = this.name;
				});
			});

			// first, stringify all of the rows

			let matrixContents = [];
			gMArray.forEach(row => matrixContents.push(row.join("")));

			matrixContents = matrixContents.join("|");	
			gameMatrix.contents = matrixContents;

			currentPiece = genPiece(pieces);
		}
	}
}



function createPieces(gravity, sprites) {
	return {
		"i": new Tetrimino(sprites.i, "i", [
			["_", "_", "_", "_"],
			["i", "i", "i", "i"],
			["_", "_", "_", "_"],
			["_", "_", "_", "_"]
		], {x: 3, y: new PlayerY(0, gravity)}, 32),
		"j": new Tetrimino(sprites.j, "j", [
			["j", "_", "_"],
			["j", "j", "j"],
			["_", "_", "_"]
		], {x: 3, y: new PlayerY(0, gravity)}, 32),
		"l": new Tetrimino(sprites.l, "l", [
			["_", "_", "l"],
			["l", "l", "l"],
			["_", "_", "_"]
		], {x: 3, y: new PlayerY(0, gravity)}, 32),
		"o": new Tetrimino(sprites.o, "o", [
			["o", "o"],
			["o", "o"]
		], {x: 4, y: new PlayerY(0, gravity)}, 32),
		"s": new Tetrimino(sprites.s, "s", [
			["_", "s", "s"],
			["s", "s", "_"],
			["_", "_", "_"]
		], {x: 3, y: new PlayerY(0, gravity)}, 32),
		"t": new Tetrimino(sprites.t, "t", [
			["_", "t", "_"],
			["t", "t", "t"],
			["_", "_", "_"]
		], {x: 3, y: new PlayerY(0, gravity)}, 32),
		"z": new Tetrimino(sprites.z, "z", [
			["z", "z", "_"],
			["_", "z", "z"],
			["_", "_", "_"]
		], {x: 3, y: new PlayerY(0, gravity)}, 32)
	}
};


function loadPieces(pieceString) {
	return new Promise((resolve, reject) => {
		let completed = 0;

		let pieceSprites = {};

		for(key of pieceString.split("")) {
			pieceSprites[key] = new Image(); // more efficiently set everything, save like 15 lines xP
			pieceSprites[key].src = `blocks/${key}.png`;

		}

		Object.values(pieceSprites).forEach(image => {
			image.onload = (img) => {completed++; if(completed === 7) {resolve(pieceSprites)}};
		});
	});
}



let bag = [];


function genPiece(pieces) {
	if(bag.length > 0) {return bag.pop();}
	else {bag = Array.from(Object.values(pieces)); bag.randomize(); return bag.pop();}
}