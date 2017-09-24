/*
* @author initkfs
*/
import GameObject from './../../Common/GameObject';
import Phaser from 'phaser';

export default class Portal extends GameObject {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this.PORTAL_ID = "PORTAL";
        this.SMOKE_ID = "SMOKE";

        this.PORTAL_ACTIVE = 0;
        this.PORTAL_WAIT = 1;
        this.portalState = null;

        this.portalHealth = 100;
        this.spawnX = 400;
        this.spawnY = 400;
    }

    load() {
        this.game.load.spritesheet(this.SMOKE_ID, this.gameServices.assetManager.withDefaultImagesAssetsPath('space/portal.png'), 128, 128, 15);
        this.game.load.spritesheet(this.PORTAL_ID, this.gameServices.assetManager.withDefaultImagesAssetsPath('space/portal_station.png'), 175, 175, 3);
    }

    //TODO refactor, simple test
    portalReady() {
        if (this.portalState === this.PORTAL_ACTIVE) {
            return;
        }

        this._object.forEach(portal => {
            this._setActive(portal);
        });

        this.portalState = this.PORTAL_ACTIVE = 1;
    }

    portalWait() {
        if (this.PORTAL_ACTIVE === 0) {
            return;
        }

        this._object.forEach(portal => {
            this._setWait(portal);
        });

        this.PORTAL_ACTIVE = 0;
    }

    _setWait(portal) {
        portal.frame = 2;
    }

    _setActive(portal) {
        portal.frame = 0;
    }

    spawn(x, y) {

        const portal = this.game.add.sprite(x, y, this.PORTAL_ID);
        portal.health = this.portalHealth;
        this.game.physics.enable(portal, Phaser.Physics.ARCADE);
        portal.anchor.setTo(0.5, 0.5);

        let smoke = this.game.add.sprite(0, 0, this.SMOKE_ID);
        smoke.anchor.setTo(0.5, 0.5);

        portal.addChild(smoke);

        let animation = smoke.animations.add('run');
        smoke.animations.play('run', 30, true);

        if (this._object) {
            this._object.add(portal);
        }

        this._setWait(portal);

        return portal;
    }

    run() {
        this._object = this.game.add.group();
        this.spawn(400, 400);
        this.gameServices.gameManager.addDamaged(this);
    }

    visualDestroy(portal) {
        let explosionSpriteID = this.gameServices.assetManager.EXPLOSION4;
        let explosionSoundID = this.gameServices.assetManager.EXPLOSION_SOUND2;
        this.gameServices.effectsManager.destroyEffect(portal, explosionSpriteID, explosionSoundID);
    }

    visualDamage(damage, portal) {
        let explosionSpriteID = this.gameServices.assetManager.EXPLOSION7;
        let explosionSoundID = this.gameServices.assetManager.EXPLOSION_SOUND1;
        this.gameServices.effectsManager.damageEffect(portal, explosionSpriteID, explosionSoundID);
    }

    update() {

        if (!this._object) {
            return;
        }


        if (this.portalState !== this.PORTAL_ACTIVE) {
            this._object.forEach(portal => {
                portal.angle += 0.5;
            });
        }


    }
}