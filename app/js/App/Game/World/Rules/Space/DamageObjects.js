/*
* @author initkfs
*/
import BaseRule from './../BaseRule';
import Phaser from 'phaser';
import Asteroids from './../../Objects/Asteroids/Asteroids';
import Gamer from './../../Objects/Player/Gamer';
import Collection from 'lodash/collection';
import LoArray from 'lodash/array';

export default class DamageObjects extends BaseRule {

    constructor(appServices, game, gameServices, ruleData) {
        super(appServices, game, gameServices, ruleData);

        //overlap - NOTE: This function is not recursive, and will not test against children of objects passed (i.e. Groups within Groups).
        // this._gameDamagers = this.game.add.group();
        this._gameDamagers = [];
        this._gameDamagedObjects = [];
    }

    addDamaged(object) {
        if (Collection.includes(this._gameDamagedObjects, object)) {
            this.appServices.logger.error(`Damaged object already exists in the damaged pool: ${object}`);
            console.log(object);
            return;
        }

        this._gameDamagedObjects.push(object);
    }

    addDamagers(object) {

        if (Collection.includes(this._gameDamagers, object)) {
            let objectName = (typeof object['name'] === 'string') ? object.name : object
            this.appServices.logger.error(`Object already exists in the damagers pool: ${objectName}`);
            console.log(object);
            return;
        }
        this._gameDamagers.push(object);
    }

    _removeDeadObjects(array) {
        array.forEach((group, index) => {
            if (group.countLiving === 0) {
                array.splice(index, 1);
            }
        })
    }

    update() {

        if (!this._gameDamagers || !this._gameDamagedObjects) {
            return;
        }

        this._removeDeadObjects(this._gameDamagers);
        this._removeDeadObjects(this._gameDamagedObjects);

        //http://phaser.io/docs/2.4.4/Phaser.Physics.Arcade.html#overlap
        // NOTE: This function is not recursive, and will not test against children of objects passed (i.e. Groups within Groups).

        this._gameDamagers.forEach(damagerManager => {

            this._gameDamagedObjects.forEach(damagedManager => {

                //TODO check compare
                if (damagerManager == damagedManager) {
                    return;
                }

                this.game.physics.arcade.overlap(damagedManager.object, damagerManager.object, (damaged, damager) => {

                    let damagerDamage = (typeof damager['gameDamage'] === 'number') ? damager.gameDamage : 0;

                    //damaged.damage(damagerDamage); kill() autocall
                    damaged.health -= damagerDamage;
                    damagedManager.visualDamage(damagerDamage, damaged);

                    let damagedDamage = (typeof damaged['gameDamage'] === 'number') ? damaged.gameDamage : 0;
                    damager.health -= damagedDamage;
                    damagerManager.visualDamage(damagerDamage, damager);

                    this.appServices.logger.debug(`Damager ${damager.key}, damage: ${damagerDamage}, health: ${damager.health} damaged ${damaged.key}, health: ${damaged.health}`);
                });
            });
        });
    }

    _getShared(array) {
        let shared = array.filter(item => {
            return item.isShared;
        })
        return shared;
    }

    destroy() {
        //TODO HACK delete non-shared only
        this._gameDamagers = this._getShared(this._gameDamagers);
        this._gameDamagedObjects = this._getShared(this._gameDamagedObjects);

        console.log(this);
    }

    get damagers() {
        return this._gameDamagers;
    }

    get damaged() {
        return this._gameDamagedObjects;
    }
}