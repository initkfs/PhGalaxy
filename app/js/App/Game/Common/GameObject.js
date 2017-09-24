/*
* @author initkfs
*/
import GameComponent from './GameComponent';
import Phaser from 'phaser';

export default class GameObject extends GameComponent {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this._object = null;
        this._spawnX = 0;
        this._spawnY = 0;
    }

    spawn(x, y) {

    }

    newGroup() {
        return this.game.add.group();
    }

    isObjectExist() {
        return !!this.object;
    }

    set spawnX(x) {

        if (!Number.isFinite(x) || x < 0) {
            throw new TypeError(`Invalid 'x' coordinate for spawn game object: ${x}`);
        }

        this._spawnX = x;
    }

    set spawnY(y) {

        if (!Number.isFinite(y) || y < 0) {
            throw new TypeError(`Invalid 'y' coordinate for spawn game object: ${y}`);
        }

        this._spawnY = y;
    }

    /*
    * @Override
    */
    destroy() {

        if (!this.object) {
            return;
        }

        if (this.object instanceof Phaser.Sprite || this.object instanceof Phaser.TileSprite) {
            this.object.destroy();
            this.appServices.logger.debug(`Destroy sprite: ${this.object.key}`);
        } else if (this.object instanceof Phaser.Group) {

            const children = this.object.children;
            const childrenCount = children.length;

            this.object.destroy();
            this.appServices.logger.debug(`Destroy group with name: ${this.object.name}, children: ${childrenCount}`); 
        }
    }

    visualDamage(damage, gameObject = null) {

    }

    visualDestroy(gameObject = null) {

    }

    get object() {
        return this._object;
    }

    bringToTop() {
        this.game.world.bringToTop(this.object);
    }
}