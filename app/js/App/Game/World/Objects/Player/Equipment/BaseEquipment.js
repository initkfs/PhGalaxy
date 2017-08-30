/*
* @author initkfs
*/
import GameObject from './../../../../Common/GameObject';

export default class BaseEquipment extends GameObject {

    set consume(value) {
        this._consume = value;
    }

    get consume() {
        if (!this._consume) {
            this.gameServices.logger.error("Equipment: consume is not set");
            return 0;
        }

        return this._consume;
    }
}