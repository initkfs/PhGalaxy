/*
* @author initkfs
*/
import Rain from './Rain';

export default class StarWind extends Rain {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        let cameraBounds = this.gameServices.gameHelper.getVisualCameraBounds();

        this.rainColor = this.appServices.config.colorAccent;
        this.rainAngle = 0;

        this.rainXSpeedMin = -500;
        this.rainXSpeedMax = 1000;
        this.rainYSpeedMin = 0;
        this.rainYSpeedMax = 2000;

        this.rainBlobWidth = 10;
        this.rainBlobHeight = 10;

        this.rainWidth = cameraBounds.width;
        this.rainX = cameraBounds.x;
        this.rainY = cameraBounds.y;
        this.rainFrequency = 20;
        this.rainCount = 50;
    }
}