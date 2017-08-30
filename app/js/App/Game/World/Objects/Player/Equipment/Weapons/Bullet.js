/*
* @author initkfs
*/
import Phaser from 'phaser';

//TODO duplicate GameSprite
export default class Bullet extends Phaser.Bullet {

    set gameDamage(value) {
        this._gameDamage = value;
    }

    set shared(value){
        this._shared = value;
    }

    get isShared(){
        return this._shared;
    }

    get gameDamage() {
        return this._gameDamage;
    }

    visualDamage(damage, gameObject = null) {

    }

    visualDestroy(gameObject = null) {
        if (gameObject === null) {
            super.kill();
        } else {
            if (!(gameObject instanceof Phaser.Bullet)) {
                throw new TypeError(`Invalid type of bullet`);
            }

            gameObject.kill();
        }
    }
}