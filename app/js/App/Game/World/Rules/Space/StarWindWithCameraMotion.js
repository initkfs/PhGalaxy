/*
* @author initkfs
*/
import BaseRule from './../BaseRule';
import StarWind from './../../Objects/StarWind';

export default class StarWindWithCameraMotion extends BaseRule {

    constructor(appServices, game, gameServices, ruleData) {
        super(appServices, game, gameServices, ruleData);

        this._starwind = null;
    }

    run() {
        //TODO unsafe getter
        const starWindManager = this.gameServices.worldStore.getObject(StarWind.name);

        if (!starWindManager) {
            this.appServices.logger.error("Star wind manager not found");
            return;
        }

        this._starwind = starWindManager.object;
        if (!this._starwind) {
            this.appServices.logger.error("Starwind object not found");
        }
    }

    update() {

        if (!this._starwind) {
            return;
        }

        let emitter = this._starwind.object;

        if (!emitter) {
            return;
        }

        emitter.x = this.game.camera.x + this.game.camera.width / 2;
        emitter.y = this.game.camera.y - this.game.camera.height;
    }

    destroy() {
        this._starwind = null;
    }
}