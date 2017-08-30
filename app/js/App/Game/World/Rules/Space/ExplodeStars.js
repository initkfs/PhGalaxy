/*
* @author initkfs
*/
import BaseRule from './../BaseRule';
import Gamer from './../../Objects/Player/Gamer';
import Phaser from 'phaser';

export default class ExplodeStars extends BaseRule {

    constructor(appServices, game, gameServices, ruleData) {
        super(appServices, game, gameServices, ruleData);

        this.PULSAR_ID = "PULSAR_ID";
    }

    load() {
        this.game.load.spritesheet(this.PULSAR_ID, this.gameServices.assetManager.withDefaultImagesAssetsPath('space/stars/pulsar_explosion.png'), 340, 340, 18);
    }

    run() {
        this._expodeTimerEvent = this.game.time.events.loop(Phaser.Timer.SECOND * 60, () => {
            this.explode();
        }, this);
    }

     explode() {
        //TODO destroy;
        let minX = this.game.camera.x;
        let maxX = minX + this.game.camera.width;
        let minY = this.game.camera.y;
        let maxY = minY + this.game.camera.height;

        let exploseCount = this.game.rnd.between(0, 5);
        for (let i = 0; i < exploseCount; i++) {
            let pulsarExplosion = this.game.add.sprite(this.game.rnd.between(minX, maxX), this.game.rnd.between(minY, maxY), this.PULSAR_ID);
            let animation = pulsarExplosion.animations.add('run');
            animation.killOnComplete = true;
            animation.play('run', 10, true);
        }
        this._reportJournalOnExplose();

    }

    destroy(){
        this.game.time.events.remove(this._expodeTimerEvent);
    }

    _reportJournalOnExplose() {
        this.gameServices.journal.append(this.appServices.translator.t("event-pulsar"));
    }
}