function renderLevel(level) {


	ctx.clearRect(0, 0, canvas.width, canvas.height)

	for(let y = 0; y < level.length; y++) {
		for(let x = 0; x < level[y].length; x++) {
			let tile = level[y][x];

			if(tile === 0) {draw(tiles.sky, x, y);}
			if(tile === 1) {draw(tiles.dirt, x, y);}
		}
	}
}

function draw(type, x, y) {
	if(typeof type === "string") {
		ctx.fillStyle = type;
		ctx.fillRect(x * tile.width, y * tile.height, tile.width, tile.height);
	} else if(typeof type === "object") { // HTMLImageElement
		ctx.drawImage(type, x * tile.width, y * tile.height);
	} else {
		console.error(`Error drawing tile at ${x}, ${y}: ${type} has typeof ${typeof type} and is invalid.`)
	}
}