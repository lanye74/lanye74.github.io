"use strict";
const tabs = Array.from(document.getElementsByTagName("tab-head"));
const colorElements = Array.from(document.getElementsByTagName("color"));
const homeButton = document.getElementById("home");
colorElements.forEach(color => {
    color.addEventListener("click", copyOnClick);
    // order the color elements from their hexadecimal ids
    color.style.setProperty("--order", ` ${(parseInt(color.id.slice(1, 2), 16)).toString()}`);
});
tabs.forEach(tab => {
    tab.addEventListener("click", updateActiveTab);
});
function copyOnClick(e) {
    const target = e.target;
    let hexToParse;
    if (target.parentElement.id === "colors") { // in case it somehow clicks through
        // color element targeted directly
        hexToParse = target.id;
    }
    else {
        // ::after targeted
        hexToParse = target.parentElement.id;
    }
    copyToClipboard(shadeHexFromID(hexToParse));
}
async function copyToClipboard(value) {
    await navigator.clipboard.writeText(value);
}
function updateActiveTab(e) {
    const target = e.target;
    for (const tab of tabs) {
        tab.classList.remove("active");
        if (tab.id === target.id) {
            tab.classList.add("active");
        }
        if (target.id === "home") {
            window.location.href = window.location.origin;
        }
    }
    updateBodyContents(target.id);
}
function updateBodyContents(id) {
    const newType = id.slice(0, 1);
    for (const color of colorElements) {
        // convert colors from one type to another
        let oldHue = color.id.slice(1, 2);
        color.id = newType + oldHue;
    }
}
function shadeHexFromID(id) {
    const color = id.slice(0, 1);
    const value = id.slice(1, 2);
    const doubledVal = value.repeat(2);
    switch (color) {
        case "r":
            {
                return `#${doubledVal}0000`;
            }
            ;
        case "g":
            {
                return `#00${doubledVal}00`;
            }
            ;
        case "b":
            {
                return `#0000${doubledVal}`;
            }
            ;
        case "w":
            {
                return `#${value.repeat(6)}`;
            }
            ;
        default: {
            throw new Error("ayo wtf");
        }
    }
}
