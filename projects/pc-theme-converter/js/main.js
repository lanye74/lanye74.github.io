"use strict";
const elements = {
    content: document.getElementById("content"),
    downloader: document.getElementById("downloader"),
    loaderContainer: document.getElementById("loaderContainer"),
    saveOptions: document.getElementById("saveOptions")
};
let text; // I hate global variables but I was too lazy to addEventListener
let fileName;
let url;
let classesJSON;
window.onload = async () => {
    classesJSON = Object.entries(await (await fetch("./classes.json")).json());
    toggleVisibility("loaderContainer");
    toggleVisibility("content");
};
async function processFile(file) {
    const reader = new FileReader();
    reader.onload = processCSS;
    reader.readAsText(file);
    fileName = file.name;
}
async function processCSS(event) {
    if (url) {
        URL.revokeObjectURL(url);
    }
    // source: bro just trust me
    text = event.target.result;
    for (const [key, value] of classesJSON) {
        text = text.replaceAll(key, value);
    }
    toggleVisibility("saveOptions");
}
async function copyToClipboard() {
    await navigator.clipboard.writeText(text);
    toggleVisibility("saveOptions");
}
function downloadAsFile() {
    const blob = new Blob([text], {
        type: "text/plain"
    });
    url = URL.createObjectURL(blob);
    elements.downloader.download = fileName;
    elements.downloader.href = url;
    elements.downloader.click();
    toggleVisibility("saveOptions");
}
function toggleVisibility(what) {
    if (!elements[what])
        return;
    elements[what].classList.toggle("show");
    elements[what].classList.toggle("hide");
}
