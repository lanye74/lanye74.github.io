const c = document.getElementById("canv");
const ctx = c.getContext("2d");


let tileCheckLoop, mainLoop;



const canvas = {
	width: 1280, // can I make this dynamic? Scrolling?
	height: 720
};

const tile = {
	width: 40,
	height: 40
};


const tiles = {
	sky: "#61b3ff",
	dirt: undefined,
	grass: undefined
};

let loadingSprites = false;



const fps = 60;

let level = 1;



let player;