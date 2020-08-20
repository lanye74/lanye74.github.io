Array.prototype.randomize = function() { // (makeMeUnhappy = (prototypes don't like a/f's) => {people[layne].unhappy = true;})();
	// yoinked from https://stackoverflow.com/a/6274381/10244569

	for (let i = this.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[this[i], this[j]] = [this[j], this[i]];
	}
}