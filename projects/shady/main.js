const tabs = Array.from(document.getElementsByTagName("tab-head"));
const shades = Array.from(document.getElementsByTagName("color"));
const homeButton = document.getElementById("home");
shades.forEach(color => {
    color.addEventListener("click", copyColor);
    color.style.setProperty("--order", " " +
        (parseInt(color.id.slice(1, 2), 16)
            + 1)
            .toString());
});
tabs.forEach(tab => {
    tab.addEventListener("click", updateActiveTab);
});
function copyColor(e) {
    const cover = e.target;
    const color = cover.parentElement;
    let tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = hexFromID(color.id);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
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
    for (const color of shades) {
        let oldHue = color.id.slice(1, 2);
        color.id = newType + oldHue;
    }
}
function hexFromID(id) {
    let color = id.slice(0, 1);
    let value = id.slice(1, 2);
    switch (color) {
        case "r":
            {
                return `#${value.repeat(2)}0000`;
            }
            ;
        case "g":
            {
                return `#00${value.repeat(2)}00`;
            }
            ;
        case "b":
            {
                return `#0000${value.repeat(2)}`;
            }
            ;
        case "w": {
            return `#${value.repeat(6)}`;
        }
    }
}
