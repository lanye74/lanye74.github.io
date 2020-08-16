class Fraction {
	constructor(fractionString) {
		this.whole = parseInt(fractionString.split("+")[0]);

		this.numer = parseInt(fractionString.split("+")[1].split("/")[0]);
		this.denom = parseInt(fractionString.split("/")[1]);
	}

	addTo(counter) {
		counter.whole += this.whole;
		counter.numer += this.numer;

		counter.update();
	}
}



class FractionCounter extends Fraction {
	constructor(fraction) {
		super(fraction);
	}

	update() {
		while(this.numer >= this.denom) {
			this.numer -= this.denom;
			this.whole++;
		}
	}
}

class PlayerY extends FractionCounter {
	constructor(offset, gravity) {
		super(`${offset}+0/${gravity.denom}`);
	}
}



// yay it works

// though really this whole class should be unnecessary


// ...IEE-754 pls