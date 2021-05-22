export default class PieceSquare {
    constructor(location) {
        this.setLocation(location);
    }
    setLocation(location) {
        this.x = location.split("")[0];
        this.y = location.split("")[1];
    }
    get coords() {
        return this.x + this.y;
    }
}
