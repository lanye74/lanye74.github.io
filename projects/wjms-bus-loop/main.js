const dropZones = Array.from(document.getElementsByClassName("drop-zone"));
const dropItems = Array.from(document.getElementsByClassName("drop-item"));
let isMoving = false;



dropZones.forEach(zone => {
	zone.ondrop = e => drop(e);
	zone.ondragover = e => allowDrop(e);

	zone.ondragenter = e => receiveItemAnim(e);
	zone.ondragleave = e => removeItemAnim(e);
});

dropItems.forEach(item => {
	item.draggable = "true";
	item.ondragstart = e => drag(e);
});




function allowDrop(e) {
	e.preventDefault();
}

function drag(e) {
	console.log(e);
	e.dataTransfer.setData("text", e.target.id);
	// need to swap with other too
}

function drop(e) {
	let data = e.dataTransfer.getData("text");
	e.preventDefault();
	e.target.appendChild(document.getElementById(data));

	removeItemAnim(e);
}

function receiveItemAnim(e) {
	if(e.target.classList.contains("drop-zone"))
		e.target.classList.add("hovered");
}

function removeItemAnim(e) {
	if(e.target.classList.contains("drop-zone"))
		e.target.classList.remove("hovered");
}