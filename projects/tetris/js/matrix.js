class Matrix {
	constructor(width, height, pieces, context, size) {
		this.width = width;
		this.height = height;
	
		this.contents = "__________|__________|__________|__________|_________|__________|__________|__________|__________|__________|__________|__________|__________|__________|__________|__________|__________|__________|__________|__________|__________|__________|__________";

		this.pieces = pieces;
		this.ctx = context;

		this.size = size;
	}

	draw() {
		// console.time("drawing took");


		ctx.fillStyle = "#000000";
		ctx.clearRect(0, 0, this.width, (this.height / 23 * 3));
		ctx.fillRect(0, ((this.height / 23) * 3), this.width, this.height);

		let arr = this.contents.split("|");

		// fuck yeah for indexes in foreach!

		arr.forEach((row, yOffset) => {
			if(row === "__________") {return;}

			row.split("").forEach((piece, xOffset) => {
				if(piece === "_") {xOffset++; return}

				ctx.drawImage(this.pieces[piece].sprite,
					xOffset * this.size,
					yOffset * this.size
				);
			});
		});
		
		// console.timeEnd("drawing took");
	}
}