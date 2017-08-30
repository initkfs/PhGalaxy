/*
* @author initkfs
*/
import BaseWeapon from './BaseWeapon';
import Bullet from './Bullet';

export default class BlasterTechnical extends BaseWeapon {
    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);
        this.bulletSpeed = 800;
        this.fireRate = 200;
    }
}