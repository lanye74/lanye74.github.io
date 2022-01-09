async function processFile(file: File): Promise<void> {
	const reader = new FileReader();

	reader.onload = processCSS;


	reader.readAsText(file);
}



async function processCSS(event: unknown): Promise<void> {
	// @ts-ignore no idea what the event type is sjfdjlfdsjlkfdsjlkfsdljkfsdjklsfdjlk
	let text = <string>event.target.result;


	const jsonData = await (await fetch("./classes.json")).json();

	for(const [key, value] of Object.entries(jsonData)) {
		text = text.replaceAll(key, <string>value);
	}


	navigator.clipboard.writeText(text);

	document.getElementById("copied")!.classList.add("appear");
}
