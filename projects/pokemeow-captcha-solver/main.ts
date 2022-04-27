const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d")!;



async function processFile(file: File) {
	const image = new Image();

	image.src = URL.createObjectURL(file);


	image.onload = () => {
		canvas.width = image.width;
		canvas.height = image.height;


		ctx.drawImage(image, 0, 0);

		convertToBackgroundless();
	}
}



function convertToBackgroundless() {
	const {data} = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const rawPixelArray = [];

	for(let i = 0; i < data.length; i += 4) {
		rawPixelArray.push(`${data[i].toString(16).padStart(2, "0")}${data[i + 1].toString(16).padStart(2, "0")}${data[i + 2].toString(16).padStart(2, "0")}`); // yummy
	}


	const cleanedPixelArray = toChunks(rawPixelArray, canvas.width);


	const pixelOccurences: pixelOccurenceObject = rawPixelArray.reduce((accumulator, current) => (accumulator[current] = (accumulator[current] || 0) + 1, accumulator), {} as pixelOccurenceObject);


	let highest: pixelOccurenceObject = {"ffffff": 2}; // background
	let secondHighest: pixelOccurenceObject | string = {"ffffff": 1}; // text color

	for(const [color, occurences] of Object.entries(pixelOccurences)) {
		if(occurences > Object.values(highest)[0]) {
			secondHighest = highest;
			highest = {[color]: occurences};
			continue;
		}

		if(occurences > Object.values(secondHighest)[0]) {
			secondHighest = {[color]: occurences};
			continue;
		}
	}


	secondHighest = Object.keys(secondHighest)[0];

	console.log("second most common color: " + secondHighest)

	// debugger

	// for(const [i, pixel] of rawPixelArray.entries()) {
	for(const [y, row] of cleanedPixelArray.entries()) {
		for(const [x, pixel] of row.entries()) {
			if(pixel !== secondHighest) {
				ctx.fillStyle = "black";
				ctx.fillRect(x, y, 1, 1);
			} else {
				ctx.fillStyle = "white";
				ctx.fillRect(x, y, 1, 1);
			}

			// ctx.fillStyle = `#${pixel}`;
			// ctx.fillRect(x, y, 1, 1);
		}
	}
}



type pixelOccurenceObject = {
	[color: string]: number;
}


function toChunks<T>(array: T[], length: number): T[][] {
	const chunks: T[][] = [];
	let i = 0;

	while(i < array.length) {
		chunks.push(array.slice(i, i += length));
	}

	return chunks;
}
