class Vector {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
	set(x, y) {
		this.x = x;
		this.y = y;
	}
	add(x, y) {
		this.x += x;
		this.y += y;
	}
	addVec(vec) {
		this.x += vec.x;
		this.y += vec.y;
	}
	multiply(x, y) {
		this.x *= x;
		this.y *= y;
	}
	clear() {
		this.x = 0;
		this.y = 0;
	}
}