// Creator's note:
// This code has been transpiled from Typescript.
// Keep this in mind while reading comments.

function attr(target: Element, attribute: string, value?: string): string | void {
	// for some reason, the function's return value can be set simply as string instead of string | void.
	// unsure why

	if(arguments.length === 2) {
		return target.getAttribute(attribute);
	} else {
		target.setAttribute(attribute, value)
	}
}



function get(searchTag: string): any { // returns Element | Element[], but that makes strict typing die if I do
	return (document.querySelectorAll(searchTag).length > 1) ? Array.from(document.querySelectorAll(searchTag)) : document.querySelectorAll(searchTag)[0];
}


const mediumDelay: number = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--medium-speed").slice(1, 4)) * 1000;
// tl;dr get CSS variable. I might turn this into a function later, if the need arises.

const cells: Element[][] = [
	[get("#top-lft"), get("#top-mid"), get("#top-rgt")],
	[get("#mid-lft"), get("#mid-mid"), get("#mid-rgt")],
	[get("#btm-lft"), get("#btm-mid"), get("#btm-rgt")]
];

const startButton: Element = get("#start");



startButton.addEventListener("click", async() => {	
	attr(startButton, "clicked", "");

	await new Promise(res => setTimeout(res, mediumDelay)); // wait for the startButton anim before unblurring the table.

	attr(get("table"), "started", "");

	document.body.removeChild(startButton); // remove startButton because it's not needed
});



cells.forEach(row => {
	row.forEach(cell => {
		cell.addEventListener("click", e => { // basic crap
			handleClick(e.target);
		});
	});
});



function handleClick(t: EventTarget): void {
	const elem = <Element>t; // cast EventTarget as Element because idk
	// (see: https://stackoverflow.com/q/28900077)
	// alternatively: const elem = t as Element

	if(elem.nodeName.toLowerCase() === "span") {
		console.log("click targets span, returning")
		return;
	}
	
	console.log(elem);
}