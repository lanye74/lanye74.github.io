function getCSSVar(property) {
	return getComputedStyle(document.documentElement).getPropertyValue(`--${property}`);
}

async function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}