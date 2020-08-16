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
	s.src = "js/" + script; // backticks (template literals) overrated, fight me

	document.head.appendChild(s);
}

// just a simple script loader module, don't ask what the point is