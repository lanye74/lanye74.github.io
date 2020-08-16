class AICircle {
	constructor(size, canvas) {
		this.size = size;

		this.pos = {
			x: Math.floor(Math.random() * (canvas.width - (this.size * 2) + 1)) + this.size,
			y: Math.floor(Math.random() * (canvas.height - (this.size * 2) + 1)) + this.size
		};


		this.vel = {
			x: Math.random(),
			y: Math.random()
		};
	}

	draw(ctx) {
		let inner = new Path2D(), outer = new Path2D(); // saves a line or two

		inner.arc(this.pos.x, this.pos.y, this.size - 1, 0, 2 * Math.PI);
		ctx.fill(inner);

		outer.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
		ctx.stroke(outer);
	}
}