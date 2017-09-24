/*
* @author initkfs
*/
import GameObject from './../../../Common/GameObject';
import Human from './Human';
import Ship from './Ship';
import Phaser from 'phaser';
import BlasterTechnical from './Equipment/Weapons/BlasterTechnical';
import Reactor from './Reactor';

export default class Gamer extends GameObject {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this._ship = null;
        this._playerGroup = null;
        this.shared = true;
    }

    load() {
        this._ship = new Ship(this.appServices, this.game, this.gameServices);
        this._ship.weapons = [new BlasterTechnical(this.appServices, this.game, this.gameServices)];

        this._ship.weapons.forEach(weapon => {
            weapon.reactor = this._ship.reactor;
        });

        this._ship.load();
    }

    _generateHuman() {
        const humanName = this.gameServices.assetManager.getArrayValueWithLang(this.appServices.config.humanNames);

        let human = new Human(humanName);

        return human;
    }

    run() {
        this._playerGroup = this.game.add.group();

        const human = this._generateHuman();
        this._ship.human = human;
        this.gameServices.journal.append(`${human.name} ${this.appServices.translator.t('event-human-created')}`);

        const shipName = this.gameServices.assetManager.getArrayValueWithLang(this.appServices.config.shipNames);
        this._ship.name = shipName;
        this.gameServices.journal.append(`"${shipName}" ${this.appServices.translator.t('event-ship-created')}`);

        this._ship.reactor = new Reactor(1000, 'Default');

        this._ship.spawnX = this.game.camera.x + 100;
        this._ship.spawnY = this.game.camera.y + 100;

        this._ship.run();

        //HACK Player is shared
        this._ship.weapons.forEach(weapon => {
            weapon.shared = true;
        });

        this._playerGroup.add(this._ship.object, true);
        this.game.camera.follow(this._ship.object);

        // this.gameServices.gameManager.addDamagers(this._playerGroup);
        this.gameServices.gameManager.addDamaged(this);
    }

    bringToTop() {
        super.bringToTop();
        this._ship.bringToTop();
    }

    visualDamage(damage, group) {
        let explosionSpriteID = this.gameServices.assetManager.EXPLOSION1;
        let explosionSoundID = this.gameServices.assetManager.EXPLOSION_SOUND1;
        this.gameServices.effectsManager.damageEffect(group, explosionSpriteID, explosionSoundID);
        this.game.camera.shake(0.01, 250);
    }

    visualDestroy(group) {

    }

    update() {
        this._ship.update();
    }

    get ship() {
        return this._ship;
    }

    get object() {
        return this._playerGroup;
    }
}