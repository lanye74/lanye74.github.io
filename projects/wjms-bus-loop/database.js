const db = firebase.database();
db.item = db.ref;


const localBuses = [];


//#region listeners for DB update
db.item("buses").on("child_added", data => {
	update("cloud");
});

db.item("buses").on("child_changed", data => {
	update("cloud");
});

db.item("buses").on("child_removed", data => {
	update("cloud");
});

db.item("buses").on("child_moved", 	data => {
	update("cloud");
});
//#endregion


function update(updateLocation) {
	db.item("buses").once("value", cloudBuses => { // get snapshot of bus items
		cloudBuses.val().forEach((cloudVal, busIndex) => { // iterate over each item of the bus array
			if(updateLocation === "cloud") { // update was from cloud, so change the local value
				localBuses[busIndex] = cloudVal;
			}

			if(updateLocation === "local") { // update was local, mirror change to cloud
				db.item(`buses/${busIndex}`).set(localBuses[busIndex]);
			}
		});
	});
}


update("cloud"); // intital pull

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