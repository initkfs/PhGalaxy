/*
* @author initkfs
*/
import GameObject from './../../Common/GameObject';
import Phaser from 'phaser';

export default class BaseEffect extends GameObject {

    destroy() {
        //TODO refactor, hack
        let targetObject = this.object;
        if (!this.isEmitter(targetObject)) {

            targetObject = this.object.object;

            if (!this.isEmitter(targetObject)) {
                return;
            }
        }

        targetObject.destroy();
    }

    isEmitter(object) {
        return object && (object instanceof Phaser.Particles.Arcade.Emitter);
    }
}