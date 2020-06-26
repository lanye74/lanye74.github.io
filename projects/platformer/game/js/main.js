const c = document.getElementById("canv");
const ctx = c.getContext("2d");


const canvas = {
	width: 1280,
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


let skipFrame = false;


ctx.fillStyle = "#ffffff";


let currentLevel = 1;


let mainLoop = setInterval(() => {
	if((Object.keys(tiles).filter(key => !tiles[key] === undefined)).length === 0) // if no properties are null
	{} else {skipFrame = true; console.log("skipping frame")}

	if(!skipFrame) {
		// updateLevel();
		renderLevel(maps[currentLevel - 1]);

		skipFrame = false;
	}
}, 1000 / fps);



(() => { // define the tiles
	let dirt = new Image(20, 20);

	dirt.src = "../../../assets/platformer/dirt.png";

	dirt.onload = () => {console.log('loaded')}

	tiles.dirt = dirt;
})();