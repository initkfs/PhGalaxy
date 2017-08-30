/*
* @author initkfs
*/
import GameObject from './../../Common/GameObject';
import Phaser from 'phaser';

export default class Planets extends GameObject {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this.PLANETS_COUNT = this.appServices.config.planetsCount;
        this.PLANETS_SPRITES_COUNT = 12;

        this.PLANET_DIR = "space/planets";
        //planet1.png
        this.PLANET_PREFIX_FILE = "planet";
        this.PLANET_PREFIX_MIN = 1;
        this.PLANET_EXT_FILE = "png";
        this.CLOUD = "cloud.png";
        this.CLOUD_COLORS = this.appServices.config.galaxyColors;

        this.planetsNames = [];
    }

    load() {

        const cloudPath = this.gameServices.assetManager.withDefaultImagesAssetsPath(this.PLANET_DIR, this.CLOUD);
        this.game.load.spritesheet(this.CLOUD, cloudPath,260 ,260,  12); 

        for (let i = this.PLANET_PREFIX_MIN; i < this.PLANETS_SPRITES_COUNT + 1; i++) {
            //TODO check extension dots, etc
            const planetFile = `${this.PLANET_PREFIX_FILE}${i}.${this.PLANET_EXT_FILE}`;

            const imagePath = this.gameServices.assetManager.withDefaultImagesAssetsPath(this.PLANET_DIR, planetFile);

            this.game.load.image(planetFile, imagePath);

            this.planetsNames.push(planetFile);
        }
    }

    spawn(x, y, planetID) {

        const planet = this.game.add.sprite(x, y, planetID);
        planet.angle = this.game.rnd.angle();
        planet.anchor.setTo(0.5, 0.5);

        const cloud =  planet.addChild(this.game.make.sprite(0, 0, this.CLOUD));
        cloud.angle = this.game.rnd.angle();
        cloud.tint =   this.gameServices.gameHelper.toTintColor(this.gameServices.gameHelper.getRandomValue(this.CLOUD_COLORS));
        cloud.anchor.setTo(0.5, 0.5);
        cloud.animations.add('run');
        cloud.animations.play('run', 30, true);

        if (this._object) {
            this._object.add(planet);
        }
    }

    run() {
        this._object = this.game.add.group();

        for (let i = 0; i < this.PLANETS_COUNT; i++) {
            const planetName = this.gameServices.gameHelper.getRandomValue(this.planetsNames);
           // this.spawn(200, 200, planetName);
            this.spawn(this.game.world.randomX, this.game.world.randomY, planetName);
        }
    }

}