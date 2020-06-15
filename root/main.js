var projects = Array.from(document.getElementsByTagName("tile"));


projects.forEach(tile => {
	tile.addEventListener("click", e => {
		if(tile.id === "templated") {window.location.pathname = "/color-templates/"}
	})
})