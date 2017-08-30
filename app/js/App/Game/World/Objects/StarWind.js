/*
* @author initkfs
*/
import BaseEffect from "./../Effects/BaseEffect";
import StarWindEffect from './../Effects/StarWindEffect';
import Phaser from 'phaser';

export default class StarWind extends BaseEffect {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this._object =  new StarWindEffect(this.appServices, this.game, this.gameServices);
    }

    run() {
        this.game.time.events.repeat(Phaser.Timer.SECOND * 5, Phaser.Timer.SECOND * 5, () => {
            this.changeWind();
        }, this);

        this._object.run();
    }

    changeWind() {
        const emitter = this._object.object;
        emitter.maxRotation = 90;
    }
}