function singleDOM(searchTag: string): Element {
	return document.querySelectorAll(searchTag)[0];
}

function multiDOM(searchTag: string): NodeList {
	return document.querySelectorAll(searchTag);
}


const mediumDelay: number = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--medium-speed").slice(1, 4))  * 100;


const cells: Element[][] | Element[][][] = [
	[singleDOM("#top-lft"), singleDOM("#top-mid"), singleDOM("#top-rgt")],
	[singleDOM("#mid-lft"), singleDOM("#mid-mid"), singleDOM("#mid-rgt")],
	[singleDOM("#btm-lft"), singleDOM("#btm-mid"), singleDOM("#btm-rgt")]
];

const startButton: Element = singleDOM("#start");



startButton.addEventListener("click", async() => {
	startButton.setAttribute("clicked", "");

	await new Promise(res => setTimeout(res, mediumDelay));

	singleDOM("table").setAttribute("started", "");
});



cells.forEach(row => {
	row.forEach(cell => {
		cell.addEventListener("click", e => {
			console.log(e.target);
		});
	});
});