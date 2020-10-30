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
	e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
	e.preventDefault();
	removeItemAnim(e);

	let dragged = document.getElementById(e.dataTransfer.getData("text"));
	let target = e.target;
	console.log(target.childNodes);
	
	// if the drop zone was targeted
	if(target.classList.contains("drop-zone")) {
		target = target.children[0];
		// make sure that the target is the drop item
	}

	// targeted item directly
	let draggedParent = dragged.parentElement;
	let targetParent = target.parentElement;

	console.log({dragged, draggedParent, target, targetParent});

	draggedParent.appendChild(target); // replace with target
	draggedParent.removeChild(dragged); // remove the moved element

	targetParent.appendChild(dragged); // add moved element to target
	// no idea why I don't have to remove the old target
}





function receiveItemAnim(e) {
	if(e.target.classList.contains("drop-zone"))
		e.target.classList.add("hovered");
}

function removeItemAnim(e) {
	if(e.target.classList.contains("drop-zone"))
		e.target.classList.remove("hovered");
}