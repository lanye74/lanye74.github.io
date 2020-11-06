const busLoop = document.getElementById("bus-loop");
const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");


let dropZones = Array.from(document.getElementsByClassName("drop-zone"));
let dropItems = Array.from(document.getElementsByClassName("drop-item"));



function drop(e) {
	//#region handle item drop
	e.preventDefault();
	removeItemAnim(e);
	let dragged = document.getElementById(e.dataTransfer.getData("text"));
	// this is what we're moving
	let draggedParent = dragged.parentElement;
	// this is the container of the dragged

	let target, targetParent;

	if(e.target.classList.contains("drop-item")) {
		// targeted item directly
		target = e.target;
		// this is the item to swap with
		targetParent = e.target.parentElement;
		// this is the drop zone we're going to
	} else {
		// targeted drop zone
		target = e.target.children[0];
		// this is the item to swap with
		targetParent = e.target;
		// this is the drop zone we're going to
	}
	
	targetParent.appendChild(dragged);
	
	if(target) {draggedParent.appendChild(target)}
 	//#endregion

	//#region update localbuses accordingly
	localBuses = [];


	Array.from(row1.children).forEach((child, index) => {
		if(child.children.length > 0) {
			localBuses.push({
				num: child.children[0].innerHTML,
				row: 1,
				col: index + 1
			});
		}
	});


	Array.from(row2.children).forEach((child, index) => {
		if(child.children.length > 0) {
			localBuses.push({
				num: child.children[0].innerHTML,
				row: 2,
				col: index + 1
			});
		}
	});
	//#endregion

	updateDB("local");
}


function updateDisplay() {
	//#region adjust column #
	db.item("loop-info").once("value", s => loopInfo = s.val());

	let oldBusColumns = row1.children.length;
	let columnsToChange = 0;
	
	if(loopInfo.cols !== oldBusColumns) {
		// if there's not enough/too many columns
		columnsToChange = loopInfo.cols - oldBusColumns;
	}

	// console.log(oldBusColumns, newBusColumns, columnsToChange);

	while(columnsToChange > 0) {
		// add more columns to each row before proceeding;

		row1.appendChild(new DropZone("td"));
		row2.appendChild(new DropZone("td"));

		columnsToChange--;
	}

	while(columnsToChange < 0) {
		row1.removeChild(row1.children[row1.childElementCount - 1]); // basically, the last elem
		row2.removeChild(row2.children[row2.childElementCount - 1]);

		columnsToChange++;
	}
	//#endregion

	//#region now: assign bus items to each thing. ugh.
	Array.from(row1.children).forEach((child, index) => {
		let matchingBuses = localBuses.filter(b => b.row === 1 && b.col === index + 1);

		child.innerHTML = "";

		if(matchingBuses != "") { // empty array == "", non-empty array != ""
			child.appendChild(new DropItem("div", matchingBuses[0]));
		}
	});


	Array.from(row2.children).forEach((child, index) => {
		let matchingBuses = localBuses.filter(b => b.row === 2 && b.col === index + 1);

		child.innerHTML = "";

		if(matchingBuses != "") { // empty array == "", non-empty array != ""
			child.appendChild(new DropItem("div", matchingBuses[0]));
		}
	});
	//#endregion

	//#region add listeners to drop-related things 
	dropZones = Array.from(document.getElementsByClassName("drop-zone"));
	dropItems = Array.from(document.getElementsByClassName("drop-item"));

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
	//#endregion
}


class DropZone { // incredibly pointless, yes, but it looks nicer when reading code
	constructor(type) {
		let newZone = document.createElement(type);
		newZone.className = "drop-zone";

		return newZone;
	}
}

class DropItem { // incredibly pointless, yes, but it looks nicer when reading code
	constructor(type, busObj) {
		let newItem = document.createElement(type);
		newItem.className = "drop-item";
		newItem.id = `bus-${busObj.row}-${busObj.col}`;
		newItem.innerText = busObj.num;

		return newItem;
	}
}


function allowDrop(e) {
	e.preventDefault();
}

function drag(e) {
	e.dataTransfer.setData("text", e.target.id);
}


function receiveItemAnim(e) {
	if(e.target.classList.contains("drop-zone"))
		e.target.classList.add("hovered");
}

function removeItemAnim(e) {
	if(e.target.classList.contains("drop-zone"))
		e.target.classList.remove("hovered");
}