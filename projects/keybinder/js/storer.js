export default class storer {
    static set(to) {
        localStorage.setItem("keybinder", JSON.stringify(to));
    }
    static grab() {
        return JSON.parse(localStorage.getItem("keybinder"));
        // even if it is null, json will spit out null
    }
}
