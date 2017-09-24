/*
* @author initkfs
*/
import GameObject from './../../../Common/GameObject';
import Human from './Human';
import DamageObjects from './../../Rules/Space/DamageObjects';
import Phaser from 'phaser';

export default class Ship extends GameObject {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this._weapons = [];
        this.SHIP_ID = "SHIP_ID";
        this.TRACK_ID = "engine_track3.png";
        this.SHIP_SPRITE = 'ships/ship_red.png';
        this.FRONT_SHIELD = "front-shield2.png";
        this._speed = 300;
        this._health = 100;
    }

    bringToTop() {
        super.bringToTop();
        this._weapons.forEach(weapon => {
            //bullets
            this.game.world.bringToTop(weapon.object);
        });
    }


    load() {
        this._weapons.forEach(weapon => {
            weapon.load();
        });

        this.game.load.image(this.SHIP_ID, this.gameServices.assetManager.withDefaultImagesAssetsPath(this.SHIP_SPRITE));
        //TODO extract spritesheet config
        this.game.load.spritesheet(this.TRACK_ID, this.gameServices.assetManager.withDefaultImagesAssetsPath(this.TRACK_ID), 92, 28.1, 8);
        this.game.load.spritesheet(this.FRONT_SHIELD, this.gameServices.assetManager.withDefaultImagesAssetsPath(this.FRONT_SHIELD), 64, 64, 16);
    }

    spawn(x, y) {
        let object = this.game.add.sprite(x, y, this.SHIP_ID);
        object.health = this._health;
        object.maxHealth = this._health;
        object.smoothed = false;
        object.anchor.setTo(0.5, 0.5);
        object.speed = this._speed;
        this.game.physics.arcade.enable(object);

        this.weapons.forEach(weapon => {
            weapon.run();
        });

        this._weapons.forEach((weapon) => {
            weapon.weapon.trackSprite(object, 0, 0, true);
            weapon.weapon.trackOffset.x = object.width;

            this.gameServices.gameManager.addDamagers(weapon);
            this.gameServices.gameManager.addDamaged(weapon);

            weapon.weapon.onFire.add(() => {
                this.reactor.decrease(weapon.consume);
            });
        });

        this.gameServices.userInterface.onFireMain.add(() => {
            if (!this._reactor) {
                return;
            }

            this._weapons.forEach(weapon => {
                if (this._reactor.isEnergyEnough(weapon.consume)) {
                    weapon.fire();
                }
            });
        });

        return object;
    }

    run() {
        this._object = this.spawn(100, 100);
        //When world is change;
    }

    //TODO extract
    _addFlyEffect() {

        if (!this.object || this.engineTrack || this.frontShield) {
            return;
        }

        let ship = this.object;

        this.engineTrack = ship.addChild(this.game.make.sprite(0, 0, this.TRACK_ID));
        this.engineTrack.anchor.setTo(1, 0.5);
        this.engineTrack.animations.add('run');
        this.engineTrack.animations.play('run', 30, true);

        this.frontShield = ship.addChild(this.game.make.sprite(0, 0, this.FRONT_SHIELD));
        this.frontShield.anchor.setTo(0.5, 0.5);
        this.frontShield.animations.add('run');
        this.frontShield.animations.play('run', 30, true);
    }

    _removeFlyEffect() {

        if (!this.engineTrack || !this.frontShield) {
            return;
        }

        this.object.removeChild(this.engineTrack);
        this.object.removeChild(this.frontShield);
        this.engineTrack.destroy();
        this.frontShield.destroy();
        this.engineTrack = null;
        this.frontShield = null;
    }

    update() {

        this._weapons.forEach(weapon => {
            weapon.update();
        });

        if (this.object && this.object.body) {
            let velocityPoint = this.object.body.velocity;
            if (velocityPoint.x === 0 && velocityPoint.y === 0) {
                this._removeFlyEffect();
            } else {
                this._addFlyEffect();
            }
        }

        if (this.object) {
            this.health = this.object.health;
        }
    }

    set name(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    get reactor() {
        return this._reactor;
    }

    set reactor(reactor) {
        this._reactor = reactor;
    }

    set human(human) {

        if (!(human instanceof Human)) {
            throw new TypeError(`Invalid ship instance received. Expected: ${Human.constructor.name}`);
        }

        this._human = human;
    }

    get human() {
        return this._human;
    }

    set weapons(weapons) {
        this._weapons = weapons;
    }

    get weapons() {
        return this._weapons;
    }

    get object() {
        return this._object;
    }
}