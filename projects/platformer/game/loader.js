const scripts = [
	"variables.js",
	
	"vector.js",
	"player.js",

	"grids.js",
	"level.js",

	"main.js"
];

for (script of scripts) {
	let s = document.createElement("script");
	s.src = "js/" + script; // backticks overrated

	document.head.appendChild(s);
}

/* simple script loader module */