/*
* @author initkfs
*/
import GameObject from './../../Common/GameObject';
import Phaser from 'phaser';

export default class StarsPulsating extends GameObject {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this.STAR_ID = "STAR";
        this.STAR_COUNT = this.appServices.config.starsPulsatingCount;
        this.STAR_COLORS = this.appServices.config.galaxyColors;
    }

    load() {
        this.game.load.spritesheet(this.STAR_ID, this.gameServices.assetManager.withDefaultImagesAssetsPath('space/stars/star_pulsating.png'), 64, 64, 6);
    }

    spawn(x, y) {
        const star = this.game.add.sprite(x, y, this.STAR_ID);
        star.tint = this.gameServices.gameHelper.toTintColor(this.gameServices.gameHelper.getRandomValue(this.STAR_COLORS));
        let animation = star.animations.add('run');
        star.animations.play('run', 4, true);
        if (this._object) {
            this._object.add(star);
        }
        return star;
    }

    run() {
        this._object = this.game.add.group();

        for (let i = 0; i < this.STAR_COUNT; i++) {
            this.spawn(this.game.world.randomX, this.game.world.randomY);
        }

    }
}