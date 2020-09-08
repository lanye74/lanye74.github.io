const tabContainer = document.getElementsByTagName("tab-heads")[0];
const tabs = Array.from(document.getElementsByTagName("tab-head")); // converts into iterable array
const content = document.getElementsByTagName("tab-content")[0]; // same here
const shades = Array.from(document.getElementsByTagName("color"));
const texts = Array.from(document.getElementsByTagName("text"));

let origText = "";
let textOut = false;
let textIn = false;

const transitionTime = parseFloat(getCSSVar("fast-speed").slice(1, 4));

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
		temp.select(); temp.setSelectionRange(0, 9999); document.execCommand("copy"); // select (setSelectionRange is for mobile) and copy

		document.body.removeChild(temp); // remove; don't need to set display to none since it gets poofed immediately
	});
});

function pad(el) {
	switch(el.id.slice(0, 1)) {
		case "r": {
			return `#${(el.id.slice(1, 2)).repeat(2)}0000`;
		}
		case "g": {
			return `#00${(el.id.slice(1, 2)).repeat(2)}00`;
		}
		case "b": {
			return `#0000${(el.id.slice(1, 2)).repeat(2)}`;
		}
		case "w": {
			return `#${(el.id.slice(1, 2)).repeat(6)}`;
		}
	}
}