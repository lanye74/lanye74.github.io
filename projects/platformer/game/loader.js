const scripts = ["main", "grids", "level"];

for (script of scripts) {
	let s = document.createElement("script");
	s.setAttribute("defer", "");
	s.src = `js/${script}.js`;

	document.head.appendChild(s);
}

/* simple script loader module */