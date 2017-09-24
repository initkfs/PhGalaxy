/*
* @author initkfs
*/
import BaseRule from './../BaseRule';
import Gamer from './../../Objects/Player/Gamer';
import Phaser from 'phaser';

export default class PlayerMotion extends BaseRule {

    constructor(appServices, game, gameServices, ruleData) {
        super(appServices, game, gameServices, ruleData);

        this._ship = null;
    }

    run() {
        const gamer = this.gameServices.worldStore.getObject(Gamer.name);

        if (!gamer) {
            this.appServices.logger.error("Gamer object not found");
            return;
        }

        this._ship = gamer.ship;

        if (!gamer.ship) {
            this.appServices.logger.error("Ship manager not found");
            return;
        }
    }


    update() {

        if (!this._ship || !this._ship.object || !this._ship.object.body) {
            return;
        }


        //FIXME bug, right button back.
        if (!this.appServices.config.mobile && this.game.input.activePointer.rightButton && this.game.input.activePointer.rightButton.isDown) {
            return;
        }

        const speed = this._ship.object.speed;
        const shipSprite = this._ship.object;

        //game.input.pointer1.isDown
        if (!this.game.input.activePointer.isDown) {
            shipSprite.body.velocity.set(0);
            return;
        }

        const pointerPosition = this.game.input.activePointer.position;

        const fireButton = this.gameServices.userInterface.mobileFire;

        if (fireButton) {
            if (Phaser.Rectangle.containsPoint(fireButton.getBounds(), pointerPosition)) {
                return;
            }
        }

        if (this.game.physics.arcade.distanceToPointer(
            shipSprite, this.game.input.activePointer) > 16) {
            this.game.physics.arcade.moveToPointer(shipSprite, speed);
            //fix sprite angle
            let rotation = this.game.physics.arcade.angleToPointer(shipSprite);
            shipSprite.rotation = rotation;
        }
    }

    destroy() {
        this._ship = null;
    }
}