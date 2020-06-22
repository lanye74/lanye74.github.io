const skipper = Array.from(document.getElementsByTagName("skipper"))[0];
const projects = Array.from(document.getElementsByTagName("tile"));
const animated = Array.from(document.querySelectorAll("[ani]"));

let timeSetter = null;
let timeKeeper = 0;

projects.forEach(tile => {
	tile.addEventListener("click", e => {
		if(tile.id === "shady") {window.location.pathname = "/projects/shady/"}
		if(tile.id === "platformer") {window.location.pathname = "/projects/platformer/"}
	});
});

skipper.addEventListener("click", _ => {
	
});

document.body.onload = () => {
	document.body.classList.add("loaded");
}