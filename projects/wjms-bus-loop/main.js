const db = firebase.database();
db.item = db.ref;



//#region listeners for DB update
db.item("random_number").on("child_added", data => {
	readDB();
});

db.item("random_number").on("child_changed", data => {
	readDB();
});

db.item("random_number").on("child_removed", data => {
	readDB();
});

db.item("random_number").on("child_moved", 	data => {
	readDB();
});
//#endregion


function readDB() {
	
}