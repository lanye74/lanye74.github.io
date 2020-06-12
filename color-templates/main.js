const tabContainer = document.getElementsByTagName("tab-heads")[0];
const tabs = Array.from(document.getElementsByTagName("tab-head")); // converts into iterable array
const content = document.getElementsByTagName("tab-content")[0]; // same here
const colors = Array.from(document.getElementsByTagName("color"));
const texts = Array.from(document.getElementsByTagName("text"));

let origText = "";
let textOut = false;
let textIn = false;

const transitionTime = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--transition-time").slice(1, 4));

tabs.forEach(tab => {
	tab.addEventListener("click", e => {
		tabs.forEach(header => {(header.className === "active") ? header.removeAttribute("class") : null}); // removes "active" from all the others (if it's there)

		tab.className = "active"; // sets current one to

		transition(e.target);
	});
});

colors.forEach(el => {
	el.addEventListener("click", e => {
		let temp = document.createElement("input");	// doing this so I can copy
		document.body.appendChild(temp); // append

		temp.value = pad(el); // set the value to that of the element's "padded" value
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

function transition(tabElem) {
	let color = tabElem.id;
	let newColor = color.slice(0, 1);

	colors.forEach(color => {
		color.id = `${newColor}${color.id.slice(1, 2)}`;
	});


}

/* 'oh god why did you do it like this,' I hear you ask

well that's a great question

I don't know

well actually I do

it's because CSS was getting annoying so JS was easier (more experience)

I wanted a nice fade from one color to the next

so changing the ID was easier than a bunch of tab contents to fade

*/