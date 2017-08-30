/*
* @author initkfs
*/
import GameObject from './../../Common/GameObject';
import Phaser from 'phaser';


export default class SpaceStation extends GameObject {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this.STATION_ID = "STATION";
        this.ENERGY_ID = "ENERGY_ID";
        this.ENERGY_SOURCE = 10;
    }

    load() {
        this.game.load.image(this.STATION_ID, this.gameServices.assetManager.withDefaultImagesAssetsPath('space/space_base.png'));
        this.game.load.image(this.ENERGY_ID, this.gameServices.assetManager.withDefaultImagesAssetsPath('space/energy_particle.png'));
    }

    spawn(x, y) {
        const station = this.game.add.sprite(x, y, this.STATION_ID);
        station.energySupply = this.ENERGY_SOURCE;
        station.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(station, Phaser.Physics.ARCADE);

        station.addChild(this._particleEffect());

        this.gameServices.gameManager.addEnergySource(this);
        return station;
    }

    run() {
        this._object = this.spawn(this.game.world.centerX, this.game.world.centerY);
    }

    _particleEffect() {
        const emitter = this.game.add.emitter(0, 0, 250);

        emitter.makeParticles(this.ENERGY_ID);

        emitter.angularDrag = 90
        emitter.setAlpha(0.3, 0.8);
        emitter.setScale(0.5, 1);
        emitter.minParticleSpeed.setTo(-300, -300);
        emitter.maxParticleSpeed.setTo(300, 300); 

        //  By setting the min and max rotation to zero, you disable rotation on the particles fully
        emitter.minRotation = 10;
        emitter.maxRotation = 20;
        emitter.flow(500, 30);
        return emitter;
    }

    update() {

        if (!this._object) {
            return;
        }

        this._object.angle += 2.5;
       this._object.position.rotate(this.game.world.centerX, this.game.world.centerY, 0.5, true, 400);;
    }
}
