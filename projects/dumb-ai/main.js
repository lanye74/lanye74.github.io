const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const aiCircles = [];



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
		// circle.update(mousePos);
		circle.draw(ctx);
	});


	requestAnimationFrame(update);
}



init(50, 16);
update();