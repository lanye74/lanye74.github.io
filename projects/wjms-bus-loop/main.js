const db = firebase.database();
db.item = db.ref;

const autoUpdate = document.getElementById("autoUpdate");
const generator = document.getElementById("generate");
const updater = document.getElementById("update");
const list = document.getElementById("list");

let li, randomNum;



generator.addEventListener("click", () => {
	randomNum = Math.round(Math.random() * 100000);

	db.item("random_number").push(randomNum);

	if(autoUpdate.checked) readDB();
});



updater.addEventListener("click", readDB);




function readDB() {
	while(list.firstChild) {
		list.removeChild(list.firstChild);
	}

	db.item("random_number").once("value", snapshot => {
		snapshot.forEach(child => {
			li = document.createElement("li");
			li.innerText = child.val();

			list.appendChild(li);
		});
	});
}