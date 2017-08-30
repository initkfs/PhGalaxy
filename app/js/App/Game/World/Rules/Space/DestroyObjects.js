/*
* @author initkfs
*/
import BaseRule from './../BaseRule';
import Phaser from 'phaser';
import Gamer from './../../Objects/Player/Gamer';

export default class DestroyObjects extends BaseRule {

    constructor(appServices, game, gameServices, ruleData) {
        super(appServices, game, gameServices, ruleData);

        this.onPlayerDead = new Phaser.Signal();
    }

    _checkPlayerDeath(target, health) {
        if (target instanceof Gamer && health <= 0) {
            this.appServices.logger.debug(`Player died.`);
            this.onPlayerDead.dispatch();
        }
    }

    update() {

        this.gameServices.worldStore.forEachObjects((gameObject, gameObjectID) => {

            let health = null;
            let deadObjects = [];
            if (typeof gameObject['health'] === 'number') {

                health = gameObject.health;

            } else if (gameObject.object && gameObject.object instanceof Phaser.Sprite) {

                let sprite = gameObject.object;
                health = sprite.health;

            } else if (gameObject.object && gameObject.object instanceof Phaser.Group) {
                let group = gameObject.object;
                group.forEach(object => {
                    if (object.health <= 0) {
                        deadObjects.push(object);
                    }
                });

            }

            //TODO refactor
            if ((health === null && deadObjects.length === 0) || health > 0) {
                return;
            } else if (deadObjects.length > 0) {
                deadObjects.forEach(deadObject => {
                    gameObject.visualDestroy(deadObject);
                    this._checkPlayerDeath(gameObject, health);
                });
            } else {
                gameObject.visualDestroy();
                this._checkPlayerDeath(gameObject, health);
            }

            const objectName = typeof gameObject['key'] === 'string' ? gameObject.key : gameObject.constructor.name;
       
            this.appServices.logger.debug(`Object dead: ${objectName}, id: ${gameObjectID}, health: ${health}`);
        });
    }

    destroy(){
        this.onPlayerDead.removeAll();
    }
}