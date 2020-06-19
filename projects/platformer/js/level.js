function drawLevel() {
	let level = maps[0];
	
	for(let y = 0; y < level.length; y++) {
		for(let x = 0; x < level[y].length; x++) {
			let tile = level[y][x];

			if(tile === null) {continue;}
			if(tile === "g") {
				ctx.fillRect(
					x * tileWidth,
					y * tileHeight,
					tileWidth,
					tileHeight
				);

				console.log(x, y);
				
				// console.log({x: x, y: y, pos: {x: x * tileWidth, y: y * tileHeight}, tileWidth, tileHeight});
			}
		}
	}

	// console.log(level);
}