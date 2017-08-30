/*
* @author initkfs
*/
export default class Reactor {

    constructor(energy, name) {
        this.energy = energy;
        this.name = name;
        this._maxEnergy = energy;
    }

    set energy(energy) {
        if (!Number.isInteger(energy) && !energy) {
            throw new TypeError("Reactor energy is empty");
        }
        this._energy = energy;
    }

    get energy() {
        return this._energy;
    }

    set name(name) {
        if (!name) {
            throw new TypeError("Reactor name is empty");
        }
        this._name = name;
    }

    get name() {
        return this._name;
    }

    increaze(value) {

        if (value <= 0) {
            return;
        }

        if (value >= this.maxEnergy) {
            this.energy = this.maxEnergy;
            return;
        }

        const differenceEnergy = this.maxEnergy - this.energy;

        this.energy += (differenceEnergy <= value) ? differenceEnergy : value;
    }

    decrease(value) {

        if (value === 0) {
            return;
        }

        if (value > this._energy) {
            this._energy = 0;
            return;
        }

        this._energy -= value;
    }

    isEnergyEnough(value) {
        return value <= this._energy;
    }

    get maxEnergy() {
        return this._maxEnergy;
    }
}