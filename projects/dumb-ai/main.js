const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const aiCircles = [];
let updater;



function init(amount, size) {
	for(let i = 0; i < amount; i++) {
		aiCircles[i] = new AICircle(size, canvas);
	}
}



function update() {
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#ff0000"

	aiCircles.forEach(circle => {
		circle.update();
		circle.draw(ctx);
	});


	updater = requestAnimationFrame(update); // updater is also a frame count
}



init(50, 16);


update();





// for debug
let circles = {
	highlightVel: (x, y, highlightStatus, signed = true) => {
		return ((signed === true) ? 
			aiCircles.filter(circle => (circle.vel.x === x || circle.vel.x === -x) && (circle.vel.y === y || circle.vel.y === -y)) :
			aiCircles.filter(circle => (circle.vel.x === x) && (circle.vel.y === y))
		).forEach(circle => circle.highlighted = highlightStatus);
	}
}