let text: string = "";
let url: string;
let fileName: string = "";

let jsonData: Object;


window.onload = async () => {
	jsonData = await (await fetch("./classes.json")).json();

	// probably make code blocking
}



async function processFile(file: File): Promise<void> {
	const reader = new FileReader();

	reader.onload = processCSS;

	fileName = file.name;


	reader.readAsText(file);
}



async function processCSS(event: unknown): Promise<void> {
	if(url) {
		URL.revokeObjectURL(url);
	}


	// @ts-ignore no idea what the event type is sjfdjlfdsjlkfdsjlkfsdljkfsdjklsfdjlk
	text = event.target.result;


	for(const [key, value] of Object.entries(jsonData)) {
		text = text.replaceAll(key, <string>value);
	}


	document.getElementById("saveOptions")!.classList.add("show");
}



async function copyToClipboard(): Promise<void> {
	await navigator.clipboard.writeText(text);

	document.getElementById("saveOptions")!.classList.remove("show");
}



function downloadAsFile(): void {
	const blob = new Blob([text], {
		type: "text/css"
	});


	url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.download = fileName;
	a.href = url;

	document.body.appendChild(a);

	a.click();

	document.body.removeChild(a);

	document.getElementById("saveOptions")!.classList.remove("show");
}
