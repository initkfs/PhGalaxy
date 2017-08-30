/*
* @author initkfs
*/
import BaseEquipment from './../BaseEquipment';
import Bullet from './../Weapons/Bullet';
import Phaser from 'phaser';

export default class BaseWeapon extends BaseEquipment {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this.BULLET_ID = "laser_red.png";
        this.BULLET_SOUND = "366007__tutarap__blaster-2.wav";

        this.consume = 15;
        this.gameDamage = 10;
        this.bulletHealth = 10;
        this.bulletCount = 5;
        this.bulletClass = Bullet;
        this.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.bulletLifespan = 1500;
        this.bulletSpeed = 600;
        this.fireRate = 200;
        //  Wrap bullets around the world bounds to the opposite side
        this.bulletWorldWrap = true;
    }

    load() {

        this.gameServices.soundManager.loadSound(this.BULLET_SOUND);

        const bulletImagePath = this.gameServices.assetManager.withDefaultImagesAssetsPath(`weapon/bullets/${this.BULLET_ID}`);
        this.game.load.image(this.BULLET_ID, bulletImagePath);
    }

    run() {
        //@see https://github.com/photonstorm/phaser-examples/blob/master/examples/weapon/asteroids%20bullet%20wrap.js
        this._weapon = this.game.add.weapon(this.bulletCount, this.BULLET_ID);
        this._weapon.bulletClass = this.bulletClass;
        this._weapon.bulletKillType = this.bulletKillType;
        this._weapon.bulletLifespan = this.bulletLifespan;
        this._weapon.bulletSpeed = this.bulletSpeed;
        this._weapon.fireRate = this.fireRate;

        this._weapon.bulletWorldWrap = this.bulletWorldWrap;

        this._weapon.onFire.add(() => {
            this.gameServices.soundManager.play(this.BULLET_SOUND);
        });

        this._weapon.bullets.forEach(bullet => {
            bullet.gameDamage = this.gameDamage;
            bullet.health = this.bulletHealth;
        });
    }

    fire() {
        return this._weapon.fire();
    }

    bullets() {
        return this._weapon.bullets;
    }

    get weapon() {
        return this._weapon;
    }

    get object() {
        //for damager and destroyer;
        return this._weapon.bullets;
    }

    visualDamage(value, damager) {
        damager.kill();
    }

    visualDestroy(object) {
        if (!object) {
            return;
        }

        object.kill();
    }
}