/*
* @author initkfs
*/
import BaseRule from './../BaseRule';
import Phaser from 'phaser';
import Gamer from './../../Objects/Player/Gamer';

export default class EnergySourceObjects extends BaseRule {

    constructor(appServices, game, gameServices, ruleData) {
        super(appServices, game, gameServices, ruleData);

        this._energySources = [];

        this._ship;
    }

    addEnergySource(object) {
        this._energySources.push(object);
    }

    run() {
        const gamer = this.gameServices.worldStore.getObject(Gamer.name);

        if (!gamer) {
            this.appServices.logger.error("Gamer not found for energy source rule");
            return;
        }

        this._ship = gamer.ship;

        if (!this._ship) {
            this.appServices.logger.error("Ship not found for energy source rule");
        }
    }

    update() {

        if (!this._energySources || !this._ship) {
            return;
        }

        this._energySources.forEach(source => {
            const object = source.object;

            this.game.physics.arcade.overlap(object, this._ship.object, (energySource, targetPlayer) => {
                
                if(energySource.energySupply) {
                    const supplyValue = energySource.energySupply;
                    this._ship.reactor.increaze(supplyValue);
                    this.appServices.logger.debug(`Find energy source, increaze reactor: ${supplyValue}`);
                }

               
            });
        });

    }


    destroy() {
        this._energySources = [];
    }

    get energySources() {
        return this._energySources;
    }
}