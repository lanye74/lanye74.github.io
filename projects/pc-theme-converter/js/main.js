"use strict";
const content = document.getElementById("content");
const downloader = document.getElementById("downloader");
const loadingText = document.getElementById("loading-text");
const progressBarProgress = document.getElementById("progress-bar-progress");
const saveOptionsContainer = document.getElementById("save-options-container");
const saveOptions = Array.from(saveOptionsContainer.children);
let text; // I hate global variables but I was too lazy to addEventListener
let fileName;
let url;
let classesJSON;
let classesCount = 0;
window.onload = async () => {
    classesJSON = Object.entries(await (await fetch("./classes.json")).json());
    classesCount = classesJSON.length;
    toggleVisibility(loadingText);
    toggleVisibility(content);
};
async function processFile(file) {
    disableSaveOptions(true);
    const reader = new FileReader();
    reader.addEventListener("load", processCSS);
    reader.readAsText(file);
    fileName = file.name;
}
function processCSS(event) {
    if (url) {
        URL.revokeObjectURL(url);
    }
    // source: bro just trust me
    text = event.target.result;
    // let i = 0;
    for (const [key, value] of classesJSON) {
        text = text.replaceAll(key, value);
        // i++;
        // if(i % 10 === 0) {
        // setProgressBarProgress(i);
        // }
    }
    disableSaveOptions(false);
}
async function copyToClipboard() {
    await navigator.clipboard.writeText(text);
}
function downloadAsFile() {
    const blob = new Blob([text], {
        type: "text/plain"
    });
    url = URL.createObjectURL(blob);
    downloader.download = fileName;
    downloader.href = url;
    downloader.click();
}
function toggleVisibility(element) {
    element.classList.toggle("hide");
}
function disableSaveOptions(state) {
    for (const saveOption of saveOptions) {
        saveOption.toggleAttribute("disabled", state);
    }
}
// function setProgressBarProgress(iteration: number) {
// 	const percentage = `${iteration / classesCount * 100}%`;
// 	progressBarProgress.style.width = percentage;
// }
