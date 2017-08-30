/*
* @author initkfs
*/
import Phaser from 'phaser';

export default class GameSprite extends Phaser.Sprite {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this._gameDamage = 0;
    }

    set gameDamage(value) {
        this._gameDamage = value;
    }

    get gameDamage() {
        return this._gameDamage;
    }

    //FIXME duplicate with game object
    visualDamage(damage, gameObject = null) {

    }

    visualDestroy(gameObject = null) {

    }
}