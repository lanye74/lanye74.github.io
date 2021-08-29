import storer from "./storer.js";

import type {KeysetMap} from "./types.js";



let localStorer: KeysetMap = {
	keysets: {},
	user: ""
};



function main() {
	const remoteStorage = storer.grab();
	if(remoteStorage === null) {
		localStorer = <KeysetMap>{};
	} else {
		localStorer = <KeysetMap>remoteStorage;
	}
}



function save() {
	storer.set(localStorer);
}



window.addEventListener("load", main, {once: true});
window.addEventListener("beforeunload", save);