/*
* @author initkfs
*/
import GameObject from './../../../Common/GameObject';
import Phaser from 'phaser';
import Asteroid from './Asteroid';
import DamageObjects from './../../Rules/Space/DamageObjects';

export default class Asteroids extends GameObject {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this.ASTEROID_ID = "asteroid0.png";
        this.ASTEROID_COUNT = this.appServices.config.asteroidsCount;
        this.asteroidColors = ["#c19046", "#e1af5f", "#aa6a05", "#7f6338", "#1faca4", "#118b84"];
        
        this.asteroidsDamage = 0.5;
        this.asteroidHealth = 15;
    }

    load() {
        this.game.load.spritesheet(this.ASTEROID_ID, this.gameServices.assetManager.withDefaultImagesAssetsPath(`space/asteroids/${this.ASTEROID_ID}`), 66.5, 66.5, 64);
    }

    spawn(x, y) {
        
        const aster = new Asteroid(this.game, x, y, this.ASTEROID_ID);
        this.game.add.existing(aster);
        
        aster.health = this.asteroidHealth;
        aster.gameDamage = this.asteroidsDamage;
        aster.anchor.setTo(0.5, 0.5);
        aster.tint = this.getAsteroidColor();
       
        aster.animations.add('run');
        aster.animations.play('run', this.game.rnd.between(20, 31), true);
        this.game.physics.enable(aster, Phaser.Physics.ARCADE);

        this.object.add(aster);
        return aster;
    }

    run() {
        this._object = this.newGroup();

        for (let i = 0; i < this.ASTEROID_COUNT; i++) {
            this.spawn(this.game.world.randomX, this.game.world.randomY);
        }

        this.gameServices.gameManager.addDamagers(this);
        this.gameServices.gameManager.addDamaged(this);    
    }

    getAsteroidColor() {
        const color = this.gameServices.gameHelper.getRandomValue(this.asteroidColors);
        return this.gameServices.gameHelper.toTintColor(color);
    }

    update() {
        //TODO optimization?
        if(!this.isObjectExist()){
            return;
        }
        this.gameServices.effectsManager.runAnimationIfInCamera(this.object);
    }

    visualDestroy(asteroid) {

        if (!asteroid) {
            return;
        }

        let explosionSpriteID = this.gameServices.assetManager.EXPLOSION5;
        let explosionSoundID = this.gameServices.assetManager.EXPLOSION_SOUND1;
        this.gameServices.effectsManager.destroyEffect(asteroid, explosionSpriteID, explosionSoundID);
    }

    visualDamage(damage, asteroid) {
        let explosionSpriteID = this.gameServices.assetManager.EXPLOSION7;
        let explosionSoundID = this.gameServices.assetManager.EXPLOSION_SOUND1;
        this.gameServices.effectsManager.damageEffect(asteroid, explosionSpriteID, explosionSoundID);
    }
}