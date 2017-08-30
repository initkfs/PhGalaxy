/*
* @author initkfs
*/
import Phaser from 'phaser';
import GameComponent from './../Common/GameComponent';
import GameObject from './../Common/GameObject';
import BaseRule from './../World/Rules/BaseRule';
import path from 'path';

export default class BaseState extends Phaser.State {

    //TODO duplicate, extends Phaser.State
    constructor(appServices, game, gameServices) {

        super();

        if (!appServices) {
            throw new TypeError('Empty application services received for state');
        }
        this._appServices = appServices;

        if (!game) {
            throw new TypeError('Empty game received for state');
        }
        this._game = game;

        if (!gameServices) {
            throw new TypeError('Empty game services received for state');
        }

        this._gameServices = gameServices;
    }

    create() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        if (!this.game.device.desktop) {
            this.appServices.config.mobile = true;
            //TODO bug in browser
            //this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; 
            //this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE; 
            this.game.scale.startFullScreen(); 
            this.appServices.logger.debug("Detect mobile device");
        } else {
            this.appServices.logger.debug("Detect desktop device");
        }
    }

    get appServices() {
        return this._appServices;
    }

    get gameServices() {
        return this._gameServices;
    }

    get game() {
        return this._game;
    }
}