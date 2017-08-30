/*
* @author initkfs
*/
import Phaser from 'phaser';
import BaseRule from './../World/Rules/BaseRule';
import GameService from './GameService';
import GameObject from './../Common/GameObject';
import Lang from 'lodash/lang';

export default class WorldStore extends GameService {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this._gameObjects = new Map();
        this._gameRules = new Map();
    }

    addRule(ruleID, rule) {

        if (!ruleID || !Lang.isString(ruleID)) {
            throw new TypeError(`Invalid rule ID for the store, expected string, received: ${typeof ruleID}`);
        }

        if (!rule || !(rule instanceof BaseRule)) {
            throw new TypeError(`Invalid rule instance for the store, expected ${BaseRule.name} extended instance, but received: ${rule}`);
        }

        if (this.hasRule(ruleID)) {
            throw new Error(`Rule with id ${ruleID} already exists in the rule store`);
        }

        this._gameRules.set(ruleID, rule);
        this.appServices.logger.debug(`Add rule to the world store: ${ruleID}`);
    }

    addObject(objectKey, gameObject) {

        if (!objectKey || !Lang.isString(objectKey)) {
            throw new TypeError(`Invalid object key store, expected string, received: ${typeof objectKey}`);
        }

        if (!gameObject || !(gameObject instanceof GameObject)) {
            throw new TypeError(`Invalid game object '${gameObject}' for world store, not a ${GameObject.name} instance`);
        }

        if (this.hasObject(objectKey)) {
            throw new Error(`Object with id ${objectKey} already exists in the object store`);
        }

        this._gameObjects.set(objectKey, gameObject);
        this.appServices.logger.debug(`Add game object to the world store: ${objectKey}`);
    }

    hasRule(key) {

        if (!key || !Lang.isString(key)) {
            throw new TypeError(`Invalid rule key, expected string, received: ${key}`);
        }

        return this._gameRules.has(key);
    }

    hasObject(key) {

        if (!key || !Lang.isString(key)) {
            throw new TypeError(`Invalid object key, expected string, received: ${key}`);
        }

        return this._gameObjects.has(key);
    }

    getRule(key) {
        return this._gameRules.get(key);
    }

    getObject(key) {
        return this._gameObjects.get(key);
    }

    removeRule(key) {

        if (!key || !Lang.isString(key)) {
            throw new TypeError(`Invalid rule key for removing, expected string, received: ${key}`);
        }

        if (!this.hasRule(key)) {
            throw new Error(`Cannot remove rule with id ${key}, rule not found in the store`);
        }

        this._gameRules.delete(key);

        this.appServices.logger.debug(`Remove rule from the world store: ${key}`);
    }

    removeObject(key) {

        if (!key || !Lang.isString(key)) {
            throw new TypeError(`Invalid object key for removing object, expected string, received: ${key}`);
        }

        if (!this.hasObject(key)) {
            throw new Error(`Cannot remove object with id ${key}, object not fount in the store`);
        }

        this._gameObjects.delete(key);
        this.appServices.logger.debug(`Remove object from the world store: ${key}`);
    }

    clearObjects() {
        this._gameObjects.clear();
        this.appServices.logger.debug(`Clear all objects in the game store`);
    }

    clearRules() {
        this._gameRules.clear();
        this.appServices.logger.debug(`Clear all rules in the game store`);
    }

     _clearNonShared(forEachCallable, removeCallable, infoForLog = "") {   
        let nonShared = 0;
        let shared = 0;
        forEachCallable((target, index) => {
            if (!target.isShared) {
                removeCallable(index);
                nonShared++;
            } else {
                shared++;
            }
        });
        this.appServices.logger.debug(`Remove non shared ${infoForLog} in the game store, shared: ${shared}, removed: ${nonShared}`);
    }

    clearNonSharedObjects() {
          this._clearNonShared(this.forEachObjects.bind(this), (index) => {
             this.removeObject(index);
        }, 'game objects');
         console.log(this._gameObjects);
    }

    clearNonSharedRules() {
        this._clearNonShared(this.forEachRules.bind(this), (index) => {
             this.removeRule(index);
        }, 'game rules');
    }

    clearNonShared() {
        this.clearNonSharedObjects();
        this.clearNonSharedRules();
    }

    clearAll() {
        this.clearObjects();
        this.clearRules();
    }

    forEachObjects(valueKeyCallback) {
        this._gameObjects.forEach((item, key) => {
            valueKeyCallback(item, key);
        });
    }

    forEachRules(valueKeyCallback) {
        this._gameRules.forEach((item, key) => {
            valueKeyCallback(item, key);
        });
    }

    destroy(){
        super.destroy();
    }
}