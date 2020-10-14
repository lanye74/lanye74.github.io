// Creator's note:
// This code has been transpiled from Typescript.
// Keep this in mind while reading comments.
function attr(target, attribute, value) {
    // for some reason, the function's return value can be set simply as string instead of string | void.
    // unsure why
    if (arguments.length === 2) {
        return target.getAttribute(attribute);
    }
    else {
        target.setAttribute(attribute, value);
    }
}
function singleDOM(searchTag) {
    return document.querySelectorAll(searchTag)[0]; // querySelectorAll returns a NodeList, only need first elem
}
function multiDOM(searchTag) {
    return Array.from(document.querySelectorAll(searchTag)); // NodeList doesn't support .forEach so convert to array
}
const mediumDelay = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--medium-speed").slice(1, 4)) * 1000;
// tl;dr get CSS variable. I might turn this into a function later, if the need arises.
const cells = [
    [singleDOM("#top-lft"), singleDOM("#top-mid"), singleDOM("#top-rgt")],
    [singleDOM("#mid-lft"), singleDOM("#mid-mid"), singleDOM("#mid-rgt")],
    [singleDOM("#btm-lft"), singleDOM("#btm-mid"), singleDOM("#btm-rgt")]
];
const startButton = singleDOM("#start");
startButton.addEventListener("click", async () => {
    attr(startButton, "clicked", "");
    await new Promise(res => setTimeout(res, mediumDelay)); // wait for the startButton anim before unblurring the table.
    attr(singleDOM("table"), "started", "");
    document.body.removeChild(startButton); // remove startButton because it's not needed
});
cells.forEach(row => {
    row.forEach(cell => {
        cell.addEventListener("click", e => {
            handleClick(e.target);
        });
    });
});
function handleClick(t) {
    const elem = t; // cast EventTarget as Element because idk
    // (see: https://stackoverflow.com/q/28900077)
    // alternatively: const elem = t as Element
    if (elem.nodeName.toLowerCase() === "span") {
        console.log("click targets span, returning");
        return;
    }
    console.log(elem);
}
