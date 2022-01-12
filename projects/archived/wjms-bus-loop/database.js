const db = firebase.database();
db.item = db.ref;


let localBuses = [];
let loopInfo;

db.item("loop-info").once("value", s => loopInfo = s.val());

//#region listeners for DB update
// child_added will initiate the DB load by triggering for each bus
db.item("buses").on("child_added", data => {
	updateDB("cloud");
});

db.item("buses").on("child_changed", data => {
	updateDB("cloud");
});

db.item("buses").on("child_removed", data => {
	updateDB("cloud");
});

db.item("buses").on("child_moved", 	data => {
	updateDB("cloud");
});
//#endregion


function updateDB(updateLocation) {
	db.item("buses").once("value", cloudBuses => { // get snapshot of bus items
		if(updateLocation === "cloud") { // update was from cloud, so change the local value
			localBuses = cloudBuses.val();
		}

		if(updateLocation === "local") { // update was local, mirror change to cloud
			db.item("buses").set(localBuses);
		}
	});

	if(updateDisplay && updateLocation === "cloud") {
		updateDisplay();
	}
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