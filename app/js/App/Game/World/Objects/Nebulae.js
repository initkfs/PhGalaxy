/*
* @author initkfs
*/
import GameObject from './../../Common/GameObject';
import Phaser from 'phaser';

export default class Nebulae extends GameObject {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this.NEBULA_COUNT = 3;
        this.NEBULA_FILE_PREFIX = "nebula";
    }

    load() {
        this.gameServices.assetManager.loadManyImages(this.gameServices.assetManager.withDefaultImagesAssetsPath(`space/nebula/${this.NEBULA_FILE_PREFIX}.png`), this.NEBULA_COUNT);
    }

    spawn(x, y, nebulaID) {
        let nebula = this.game.add.sprite(x, y, nebulaID);

        if (this._object) {
            this._object.add(nebula);
        }

    }

    run() {
        this._object = this.game.add.group();

        this.gameServices.assetManager.spriteFromPatternName(this.NEBULA_FILE_PREFIX, this.NEBULA_COUNT, (nebulaID => {
            this.spawn(this.game.world.randomX, this.game.world.randomY, nebulaID);
        }));

        if (this.appServices.config.isNewSystem) {
            this.gameServices.journal.append(this.appServices.translator.t("event-nebula-created"));
        }
    }

}