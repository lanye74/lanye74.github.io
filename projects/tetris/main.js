const canv = document.getElementById("canv");
const ctx = canv.getContext("2d");

let updater;



let gravity = new Fraction("0+1/2");



let gravFrame = new FractionCounter(`0+0/${gravity.denom}`);


let pieces;
let matrix = new Matrix(canv.width, canv.height, undefined, ctx, 32);

let currentPiece;


let pieceSprites = loadPieces("ijlostz");

pieceSprites.then(sprites => {
	pieces = createPieces(gravity, sprites);
	matrix.pieces = pieces;

	currentPiece = genPiece(pieces);


	update();
});



function update() {
	if(gravity.numer || gravity.whole) {
		gravity.addTo(gravFrame);

		if(gravFrame.whole >= 1) {
			gravFrame.addTo(currentPiece.pos.y);

			gravFrame.whole = 0;
			gravFrame.numer = 0;

			// console.log("Dropping, player position:", currentPiece.pos.y);
		}
	}


	console.log("updating")
	currentPiece.handleCollisions(matrix, pieces);
	matrix.draw();
	currentPiece.draw();

	updater = requestAnimationFrame(update);
}


// updater = setInterval(update, 1000 / 10)



console.log("Gravity is:", gravity);