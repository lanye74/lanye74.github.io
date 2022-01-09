"use strict";
let text = "";
let url;
let fileName = "";
async function processFile(file) {
    const reader = new FileReader();
    reader.onload = processCSS;
    fileName = file.name;
    reader.readAsText(file);
}
async function processCSS(event) {
    if (url) {
        URL.revokeObjectURL(url);
    }
    // @ts-ignore no idea what the event type is sjfdjlfdsjlkfdsjlkfsdljkfsdjklsfdjlk
    text = event.target.result;
    const jsonData = await (await fetch("./classes.json")).json();
    for (const [key, value] of Object.entries(jsonData)) {
        text = text.replaceAll(key, value);
    }
    // navigator.clipboard.writeText(text);
    document.getElementById("saveOptions").classList.add("show");
}
async function copyToClipboard() {
    navigator.clipboard.writeText(text);
    document.getElementById("saveOptions").classList.remove("show");
}
async function downloadAsFile() {
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
    document.getElementById("saveOptions").classList.remove("show");
}
