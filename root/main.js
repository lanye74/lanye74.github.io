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
	clearInterval(timeSetter);
	skipAnimatedElems();
});

document.body.onload = () => {
	document.body.classList.add("loaded");

	// timeSetter = setInterval(() => {
	// 	timeKeeper += 0.1;
	// 	timeKeeper = parseFloat(timeKeeper.toPrecision(2));

	// 	if(timeKeeper == 6) {
	// 		clearInterval(timeSetter);
	// 		skipper.className = "hidden";
	// 	}
	// }, 100);
}

function skipAnimatedElems() {
	// let style = document.createElement("style");

	// style.innerHTML = `[ani] {animation-delay: ${timeKeeper - 0.1}s !important;}`;

	// document.head.appendChild(style);
}