import type {KeysetMap} from "./types.js";



export default class storer {
	static set(to: Object) {
		localStorage.setItem("keybinder", JSON.stringify(to));
	}

	static grab(): KeysetMap | null {
		return JSON.parse(localStorage.getItem("keybinder")!);
		// even if it is null, json will spit out null
	}
}