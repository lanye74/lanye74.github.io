const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");

const width = 1280;
const height = 720;

const tileWidth = 40;
const tileHeight = 40;

const fps = 1;

let mainLoop = setInterval(() => {
	drawLevel();
	clearInterval(mainLoop);
}, 1000 / fps);