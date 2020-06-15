const tabContainer = document.getElementsByTagName("tab-heads")[0];
const tabs = Array.from(document.getElementsByTagName("tab-head")); // converts into iterable array
const content = document.getElementsByTagName("tab-content")[0]; // same here
const shades = Array.from(document.getElementsByTagName("color"));
const texts = Array.from(document.getElementsByTagName("text"));

let origText = "";
let textOut = false;
let textIn = false;

const transitionTime = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fast-speed").slice(1, 4));

tabs.forEach(tab => {
	tab.addEventListener("click", e => {
		if(tab.id === "home") {
			window.location.href = window.location.origin;

			return;
		}

		tabs.forEach(header => {(header.className === "active") ? header.removeAttribute("class") : null}); // removes "active" from all the others (if it's there)

		tab.className = "active"; // sets current one to

		shades.forEach(color => {
			color.id = `${e.target.id.slice(0, 1)}${color.id.slice(1, 2)}`; /* css transitions it by itself because  y a y */
		});
	});
});

shades.forEach(color => {
	color.addEventListener("click", e => {

		let temp = document.createElement("input");	// doing this so I can copy
		document.body.appendChild(temp); // append

		temp.value = pad(color); // set the value to that of the element's "padded" value
		temp.select(); document.execCommand("copy"); // select and copy

		document.body.removeChild(temp); // remove; don't need to set display to none since it gets poofed immediately
	});
});

function pad(el) {
	let color = el.id.slice(0, 1);
	let type = el.id.slice(1, 2);

	switch(color) {
		case "r": {
			return `#${type.repeat(2)}0000`;
		}
		case "g": {
			return `#00${type.repeat(2)}00`;
		}
		case "b": {
			return `#0000${type.repeat(2)}`;
		}
		case "w": {
			return `#${type.repeat(6)}`;
		}
	}
}