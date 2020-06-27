const c = document.getElementById("canv");
const ctx = c.getContext("2d");


const canvas = {
	width: 1280, // can I make this dynamic? Scrolling?
	height: 720
};

const tile = {
	width: 40,
	height: 40
};

const tiles = {
	dirt: undefined,
	sky: "#61c8e7"
};

const fps = 60;

let loadingSprites = false;


let level = 1;


let mainLoop = setInterval(() => {
	if(!Object.values(tiles).includes(undefined)) { // check if any value is undefined
		loadingSprites = false; // false if all loaded exist
	} else {
		loadingSprites = true;
	}

	if(!loadingSprites) {
		// updateLevel();
		renderLevel(maps[level - 1]);

		loadingSprites = false;
	}
}, 1000 / fps);



(() => { // define the tiles
	let dirt = new Image(20, 20);

	dirt.src = "../../../assets/platformer/dirt.png";

	dirt.onload = () => {tiles.dirt = dirt; console.log("loaded")}
})();