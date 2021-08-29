import storer from "./storer.js";
let localStorer = {
    keysets: {},
    user: ""
};
function main() {
    const remoteStorage = storer.grab();
    if (remoteStorage === null) {
        localStorer = {};
    }
    else {
        localStorer = remoteStorage;
    }
}
function save() {
    storer.set(localStorer);
}
window.addEventListener("load", main, { once: true });
window.addEventListener("beforeunload", save);
