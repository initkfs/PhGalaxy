/*
* @author initkfs
*/
import BaseEffect from './BaseEffect';

export default class Rain extends BaseEffect {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this.rainBlobWidth = 15;
        this.rainBlobHeight = 50;
        this.rainColor = '#9cc9de';

        this.rainX = this.game.world.centerX;
        this.rainWidth = this.game.world.width;
        this.rainY = -300;
        this.rainCount = 400;

        this.rainAngle = 10;
        this.rainXSpeedMin = -5;
        this.rainXSpeedMax = 5;
        this.rainYSpeedMin = 600;
        this.rainYSpeedMax = 1000;
        this.rainLifeTimeMS = 1600;
        this.rainFrequency = 5;
    }

    run() {

        let rainParticle = this.game.add.bitmapData(this.rainBlobWidth, this.rainBlobHeight);

        rainParticle.ctx.rect(0, 0, this.rainBlobWidth, this.rainBlobHeight);
        rainParticle.ctx.fillStyle = this.rainColor;
        rainParticle.ctx.fill();

        const emitter = this.game.add.emitter(this.rainX, this.rainY, this.rainCount);

        emitter.width = this.rainWidth;
        emitter.angle = this.rainAngle;

        emitter.makeParticles(rainParticle);

        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.3;

        emitter.setYSpeed(this.rainYSpeedMin, this.rainYSpeedMax);
        emitter.setXSpeed(this.rainXSpeedMin, this.rainXSpeedMax);

        emitter.minRotation = 0;
        emitter.maxRotation = 0;

        emitter.start(false, this.rainLifeTimeMS, this.rainFrequency, 0);
        this._object = emitter;
    }
}