const c = document.getElementById("canv");
const ctx = c.getContext("2d");

const canvas = {
	width: 1280,
	height: 720
};

const tile = {
	width: 20,
	height: 20
};

const fps = 60;




let mainLoop = setInterval(() => {
	drawLevel();
}, 1000 / fps); /* ugh code */