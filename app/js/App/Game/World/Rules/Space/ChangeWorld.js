/*
* @author initkfs
*/
import BaseRule from './../BaseRule';
import Gamer from './../../Objects/Player/Gamer';
import Portal from './../../Objects/Portal';
import Phaser from 'phaser';

export default class ChangeWorld extends BaseRule {

    constructor(appServices, game, gameServices, ruleData) {
        super(appServices, game, gameServices, ruleData);

        this._ship;
        this._portal;
        this.onChange = new Phaser.Signal();
        this.waitTeleport = false;
    }

    run() {
        this._initShip();
        this._initPortal();

        //prevent double teleport
        this.waitTeleport = false;
    }

    _initShip() {

        const gamer = this.gameServices.worldStore.getObject(Gamer.name);

        if (!gamer) {
            this.appServices.logger.error("Gamer not found");
            return;
        }

        const shipManager = gamer.ship;

        if (!shipManager) {
            this.appServices.logger.error("Ship manager not found");
            return;
        }

        this._ship = shipManager.object;

        if (!this._ship) {
            this.appServices.logger.error("Ship not found");
        }
    }

    _initPortal() {

        this._portal = this.gameServices.worldStore.getObject(Portal.name);

        if (!this._portal || !this._portal.object) {
            this.appServices.logger.error("Portal manager not found");
            return;
        }
    }

    update() {

        if (!this._ship || !this._portal || !this._portal.object) {
            return;
        }

        this._portal.object.forEach(singlePortal => {
            if (this.game.physics.arcade.distanceBetween(this._ship, singlePortal) < 300) {
                this._portal.portalReady();
            } else {
                this._portal.portalWait();
            }
        })

        this.game.physics.arcade.overlap(this._ship, this._portal.object, () => {

            if (this.waitTeleport) {
                return;
            }

            this.waitTeleport = true;

            this.appServices.logger.debug('Change world request detected. Run teleport');
           // let teleportEvent = this.game.time.events.add(Phaser.Timer.SECOND * 1, this._teleport, this);
           this._teleport();
        });
    }

    _teleport() {
        //TODO extract
        this._ship.x = 100;
        this._ship.y = 100;
        this.appServices.logger.debug("Player teleported");
        this.game.time.events.add(Phaser.Timer.SECOND * 0.1, () => {
             this.onChange.dispatch();
        }, this);
       
    }

    destroy() {
        this._ship = null;
        this._portal = null;
        this.onChange.removeAll();
    }
}