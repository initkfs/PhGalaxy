/*
* @author initkfs
*/
import BaseRule from './../BaseRule';
import Gamer from './../../Objects/Player/Gamer';
import Phaser from 'phaser';

export default class UpdateGUI extends BaseRule {

    constructor(appServices, game, gameServices, ruleData) {
        super(appServices, game, gameServices, ruleData);

        this._ship;
        this._reactor;
    }

    run() {
        const gamer = this.gameServices.worldStore.getObject(Gamer.name);

        if (!gamer) {
            this.appServices.logger.error("Update gui: gamer not found");
            return;
        }

        this._ship = gamer.ship.object;
        this._reactor = gamer.ship.reactor;

        if (!this._ship) {
            this.appServices.logger.error("Ship not found");
            return;
        }

        if (!this._reactor) {
            this.appServices.logger.error("Reactor not found");
            return;
        }

        let health = this._ship.maxHealth;
        let energy = this._reactor.maxEnergy;

        this.gameServices.userInterface.maxHealth = health;
        this.gameServices.userInterface.maxEnergy = energy;

        this._setPlayerData(0, 0);

        this.appServices.logger.debug(`Update gui. Set initial value, max health: ${health}, max energy: ${energy}`);
        //this.created = true;
    }

    destroy() {
        this._ship = null;
        this._reactor = null;
    }

    update() {

        if (!this._ship || !this._reactor) {
            return;
        }

        //   if (!this.isCreated) {
        //       return;
        //   }

        this._setPlayerData(this._ship.health, this._reactor.energy);
    }

    _setPlayerData(health, energy) {
        this.gameServices.userInterface.health = health;
        this.gameServices.userInterface.energy = energy;
    }
}