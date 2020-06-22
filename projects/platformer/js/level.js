function drawLevel() {
	let level = maps[0];

	ctx.fillStyle = "#fff";
	
	for(let y = 0; y < level.length; y++) {
		for(let x = 0; x < level[y].length; x++) {
			let tile = level[y][x];

			if(tile === 0) {continue;}
			if(tile === 1) {draw(x, y);}
		}
	}
}

function draw(x, y) {
	ctx.fillRect(x * tileWidth, y * tileWidth, tileWidth, tileHeight);
}