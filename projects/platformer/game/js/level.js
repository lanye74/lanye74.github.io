function renderLevel(level) {

	ctx.translate(0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.translate(-player.pos.x, -player.pos.y);
	
	for(let y = 0; y < level.length; y++) {
		for(let x = 0; x < level[y].length; x++) {
			let tile = level[y][x];

			if(tile === 0) {draw(tiles.sky, x, y);}
			if(tile === 1) {draw(tiles.dirt, x, y);}
			if(tile === 2) {draw(tiles.grass, x, y);}
		}
	}
}

function draw(type, x, y) {
	if(typeof type === "string") { // A hex code
		if(ctx.fillStyle !== type) {ctx.fillStyle = type;}

		ctx.fillRect(x * tile.width, y * tile.height, tile.width, tile.height);
	}
	else if(typeof type === "object") { // typeof HTMLImageElement === object
		ctx.drawImage(type, x * tile.width, y * tile.height);
	}
	else {
		console.error(`Error drawing tile at ${x}, ${y}: ${type} has typeof ${typeof type} and is invalid.`)
	}
}