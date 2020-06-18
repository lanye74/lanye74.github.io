const scripts = ["main"];

for(let i = 0; i < scripts.length; i++) {
	let s = document.createElement("script");
	s.src = `js/${scripts[i]}.js`;

	document.head.appendChild(s);
}



/* simple script loader module so I don't have to uselessly keep index.html open */