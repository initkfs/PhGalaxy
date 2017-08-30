/*
* @author initkfs
*/
import BaseRule from './../BaseRule';
import Galaxy from './../../Objects/GalaxySystem';
import Gamer from './../../Objects/Player/Gamer';

export default class PlayerWithStarfieldMotion extends BaseRule {

    constructor(appServices, game, gameServices, ruleData) {
        super(appServices, game, gameServices, ruleData);

        this._ship;
        this._starfield;
    }

    run() {
        this._initStarfield();
        this._initShip();
    }

    _initStarfield() {
        const galaxyManager = this.gameServices.worldStore.getObject(Galaxy.name);

        if (!galaxyManager) {
            this.appServices.logger.error("Galaxy manager not found");
            return;
        }

        this._starfield = galaxyManager.object;

        if (!this._starfield) {
            this.appServices.logger.error("Starfield not found in the galaxy manager");
        }
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


    update() {

        return;

        let starfield = this._starfield;
        let player = this._player;

        if (!starfield || !starfield.tilePosition || !player || !player.body) {
            return;
        }

        if (!this.game.camera.atLimit.x) {
            starfield.tilePosition.x -= ((player.body.velocity.x) * this.game.time.physicsElapsed);
        }
        if (!this.game.camera.atLimit.y) {
            starfield.tilePosition.y -= ((player.body.velocity.y) * this.game.time.physicsElapsed);
        }
    }

    destroy(){
        this._ship = null;
        this._starfield = null;
    }
}