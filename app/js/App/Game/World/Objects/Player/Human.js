/*
* @author initkfs
*/
export default class Human {

    constructor(name) {
        this.name = name;
    }

    set name(name) {
        if (!name) {
            throw new TypeError("Human name is empty");
        }
        this._name = name;
    }

    get name() {
        return this._name;
    }
}