type elementsTypeBecauseTypescriptIsStinky = {
	content: HTMLElement;
	downloader: HTMLAnchorElement;
	loaderContainer: HTMLElement;
	saveOptions: HTMLElement;
	[key: string]: any;
}

const elements: elementsTypeBecauseTypescriptIsStinky = { // I hate this
	content: document.getElementById("content")!,
	downloader: <HTMLAnchorElement>document.getElementById("downloader")!,
	loaderContainer: document.getElementById("loaderContainer")!,
	saveOptions: document.getElementById("saveOptions")!
};




let text: string; // I hate global variables but I was too lazy to addEventListener
let fileName: string;
let url: string;

let classesJSON: [string, string][]



window.onload = async () => { // could be async but I like .then :)
	classesJSON = Object.entries(await (
		await fetch("./classes.json")
		).json()
	);


	toggleVisibility("loaderContainer");
	toggleVisibility("content");
}



async function processFile(file: File): Promise<void> {
	const reader = new FileReader();

	reader.onload = processCSS;

	reader.readAsText(file);

	fileName = file.name;
}



async function processCSS(event: ProgressEvent<FileReader>): Promise<void> {
	if(url) {
		URL.revokeObjectURL(url);
	}

	// source: bro just trust me
	text = <string>event!.target!.result;


	for(const [key, value] of classesJSON) {
		text = text.replaceAll(key, value);
	}


	toggleVisibility("saveOptions");
}



async function copyToClipboard(): Promise<void> {
	await navigator.clipboard.writeText(text);

	toggleVisibility("saveOptions");
}



function downloadAsFile(): void {
	const blob = new Blob([text], {
		type: "text/plain"
	});


	url = URL.createObjectURL(blob);


	elements.downloader.download = fileName;
	elements.downloader.href = url;

	elements.downloader.click();

	toggleVisibility("saveOptions");
}



function toggleVisibility(what: string): void {
	if(!elements[what]) return;

	elements[what].classList.toggle("show");
	elements[what].classList.toggle("hide");
}
