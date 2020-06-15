var projects = Array.from(document.getElementsByTagName("tile"));


projects.forEach(tile => {
	tile.addEventListener("click", e => {
		if(tile.id === "shady") {window.location.pathname = "/shady/"}
	})
})