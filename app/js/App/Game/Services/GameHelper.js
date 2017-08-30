/*
* @author initkfs
*/
import GameService from './GameService';
import Phaser from 'phaser';
import GameComponent from './../Common/GameComponent';
import GameObject from './../Common/GameObject';
import BaseRule from './../World/Rules/BaseRule';
import ColorUtil from './../../Core/Util/ColorUtil';

export default class GameHelper extends GameService {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);
    }

    getVisualCameraBounds() {
        const game = this.game;
        const bounds = new Phaser.Rectangle(game.camera.x, game.camera.y, game.camera.width, game.camera.height);
        return bounds;
    }

    getRandomValue(array) {
        //TODO check is array
        return Phaser.ArrayUtils.getRandomItem(array);
    }

    toTintColor(webColor) {
        return ColorUtil.toHexColor(webColor);
        //return Phaser.Color.hexToColor(webColor);
    }

    setTintWithRandomByChance(chance, colors, sprite) {
        if (this.isChance(chance)) {
            sprite.tint = this.toTintColor(this.gameServices.gameHelper.getRandomValue(colors));
        }
    }

    isChance(frequency) {
        const randomFrac = this.game.rnd.frac();
        return randomFrac <= frequency;
    }

    newSignal() {
        return new Phaser.Signal();
    }

    destroy(){
        super.destroy();
    }

}