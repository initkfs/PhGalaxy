/*
* @author initkfs
*/
import GameObject from './../../Common/GameObject';
import Phaser from 'phaser';
import GalaxySystem from './GalaxySystem';

export default class Giants extends GameObject {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this.GIANTS_ID = "GIANTS";
        this.GIANTS_DAMAGE = 0.1;
        this.GIANTS_HEALTH = 1000000;
    }

    load() {
        this.game.load.spritesheet(this.GIANTS_ID, this.gameServices.assetManager.withDefaultImagesAssetsPath('space/stars/giants.png'), 512, 512, 4); 
    }

    spawn(x, y) {
        const giant = this.game.add.sprite(x, y, this.GIANTS_ID);
        giant.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(giant, Phaser.Physics.ARCADE);

        const system = this.gameServices.worldStore.getObject(GalaxySystem.name);
        if(system.object && system.object.tint){
            const systemColor = system.object.tint;
            giant.tint = systemColor;
        }

        giant.gameDamage = this.GIANTS_DAMAGE;
        giant.health = this.GIANTS_HEALTH;
        let animation = giant.animations.add('run');
        giant.animations.play('run', 5, true);
        this.game.physics.enable(giant, Phaser.Physics.ARCADE);
        if (this._object) {
            this._object.add(giant);
        }
        return giant;
    }

    run() {
        this._object = this.game.add.group();
        this.gameServices.gameManager.addDamagers(this);
        this.gameServices.gameManager.addDamaged(this);
        this.spawn(this.game.world.centerX, this.game.world.centerY);
    }
}