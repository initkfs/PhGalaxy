/*
* @author initkfs
*/
import BaseGameComponent from './BaseGameComponent';
import GameServiceManager from './../Services/GameServiceManager';

export default class GameComponent extends BaseGameComponent {

    constructor(appServices, game, gameServices) {
        super(appServices, game);

        if (!gameServices || !(gameServices instanceof GameServiceManager)) {
            throw new TypeError(`Invalid game services received. Expected instance of ${GameServiceManager.name}, received: ${gameServices}`);
        }

        this._gameServices = gameServices;
        //The object is not deleted from the pool, when state changes
        this.shared = false; 
    }

    get isShared() {
        return this.shared;
    }

    load() {

    }

    run() {

    }

    update() {

    }

    destroy() {

    }

    get gameServices() {
        return this._gameServices;
    }
}