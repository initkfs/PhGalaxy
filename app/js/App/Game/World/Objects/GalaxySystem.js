/*
* @author initkfs
*/
import GameObject from './../../Common/GameObject';
import Phaser from 'phaser';

export default class GalaxySystem extends GameObject {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this.STARFIELD_ID = "STARFIELD_ID";
        this.galaxyNamePrefix = "M";
        this.galaxyMaxNumber = 1000;
        this.galaxyHealth = 10000;
        this.galaxyChangeColorChance = 0.8;
        this.galaxyColors = this.appServices.config.galaxyColors;
    }

    load() {
        this.game.load.image(this.STARFIELD_ID, this.gameServices.assetManager.withDefaultImagesAssetsPath('space/starfield.jpeg'));
    }

    _reportNewGalaxy(name) {
        const journal = this.gameServices.journal;
        journal.append(this.appServices.translator.t("event-galaxy-created") + " " + name);
    }

    run() {
        
        const name = this.generateRandomName();

        if (this.appServices.config.isNewSystem) {
            this._reportNewGalaxy(name);
        }

        let backgroundWidth = this.appServices.config.sceneWidth;
        let backgroundHeight = this.appServices.config.sceneHeight;

        this._object = this.game.add.tileSprite(0, 0, backgroundWidth, backgroundHeight, this.STARFIELD_ID);
        this._object.fixedToCamera = true;
        this._object.name = name;
        this._object.health = this.galaxyHealth;

        //random background color;
        this.gameServices.gameHelper.setTintWithRandomByChance(this.galaxyChangeColorChance, this.galaxyColors, this._object);

        this._object.fixedToCamera = true;
    }

    generateRandomName() {
        let galaxyNumber = this.game.rnd.between(1, this.galaxyMaxNumber);
        return this.galaxyNamePrefix + galaxyNumber;
    }
}