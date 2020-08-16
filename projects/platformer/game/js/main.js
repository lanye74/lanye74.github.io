tileCheckLoop = setInterval(() => {
	if(!Object.values(tiles).includes(undefined)) { // if no tiles are undefined
		loadingSprites = false; // false if all loaded exist
	} else {
		loadingSprites = true;
	}

	if(!loadingSprites) {
		// I was going to have the main loop set in this if statement, but...
		// efficiency is king. Even though it's really not necessary to have a seperate loop,
		// as processing power is really good now, optimization is just- *chef's kiss*

		// tl;dr I didn't see a reason to have keep those if's at the top, and check them 60 times a second.

		console.log("All tiles loaded, beginning to draw!");

		player = new Player(0, 0);

		clearInterval(tileCheckLoop);
		setMainLoop();
	}
}, 1000 / 5); // 5 times/sec




(() => { // Define tiles lambda function

	console.log("Loading tiles...");

	console.log(`${getLoadedTiles()} / ${Object.keys(tiles).length} loaded - finished load of sky tile`);
	
	// dirt

	let dirt = new Image(tile.width, tile.height);
	dirt.src = "../../../assets/platformer/dirt.png";
	dirt.onload = () => {tiles.dirt = dirt; console.log(`${getLoadedTiles()} / ${Object.keys(tiles).length} loaded - finished load of dirt tile`)};
	
	// grass

	let grass = new Image(tile.width, tile.height);
	grass.src = "../../../assets/platformer/grass.png";
	grass.onload = () => {tiles.grass = grass; console.log(`${getLoadedTiles()} / ${Object.keys(tiles).length} loaded - finished load of grass tile`)}
})();




function setMainLoop() {
	mainLoop = setInterval(() => {
		// updateWorld();
		player.update();

		renderLevel(maps[level - 1]);

		player.draw();
	}, 1000 / fps);
}


function getLoadedTiles() {
	return Object.values(tiles).filter(value => typeof value !== "undefined").length; // this stupid line took me far too long
}