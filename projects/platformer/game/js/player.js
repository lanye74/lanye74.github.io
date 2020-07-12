class Player {
	constructor(x, y) {
		this.pos = new Vector(x, y);
		this.vel = new Vector(0, 0);
		this.acc = new Vector(0, 0);
	}
	update() {
		this.vel.addVec(this.acc);
		this.acc.clear(); // this way it doesn't zoom into infinity
		this.pos.addVec(this.vel);
	}
	draw() {
		ctx.fillStyle = "#0000bb";
		ctx.fillRect(0, 0, 10, 10);
	}
}