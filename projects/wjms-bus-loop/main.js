const db = firebase.database();
db.item = db.ref;


let buses = {
	132: {row: 1, col: 5},
	561: {row: 2, col: 3}
}


//#region listeners for DB update
db.item("random_number").on("child_added", data => {
	update("remote");
});

db.item("random_number").on("child_changed", data => {
	update("remote");
});

db.item("random_number").on("child_removed", data => {
	update("remote");
});

db.item("random_number").on("child_moved", 	data => {
	update("remote");
});
//#endregion


function update(location) {
	db.item("buses").once("value", busloop => {
		busloop.forEach(bus => {
			console.log(bus);
		});
	});
}


/**
 * Todo: typescript pog?
 * 
 * What: Use TS
 * Why: Because it's better, also I can create BusObject interfaces {number, row, col}
 * When: whenever
 * How: npm install firebase
 * 
 * let buses: {[key: number]: object} = {}
 */