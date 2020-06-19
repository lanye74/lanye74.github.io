const scripts = ["main", "grids", "level"];

for (script of scripts) {
	let s = document.createElement("script");
	s.src = `js/${script}.js`;

	document.head.appendChild(s);
}

/* simple script loader module */