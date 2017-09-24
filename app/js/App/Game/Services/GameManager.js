/*
* @author initkfs
*/
import GameService from './GameService';
import Phaser from 'phaser';
import GameComponent from './../Common/GameComponent';
import GameObject from './../Common/GameObject';
import BaseRule from './../World/Rules/BaseRule';
import DamageObjects from './../World/Rules/Space/DamageObjects';
import EnergySourceObjects from './../World/Rules/Space/EnergySourceObjects';

export default class GameManager extends GameService {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);
        this.LOAD = 'load';
        this.UPDATE = 'update';
        this.RUN = 'run';
        this.DESTROY = 'destroy';
    }

    changeWorld() {
        this.destroyNonSharedWorld();
        this.runWorld(true);
        //TODO hack
        this.gameServices.userInterface.toTop();
        this.appServices.logger.debug("Change world");
    }

    runWorld(shared = false) {

        this.runAllGameServices();

        if (shared) {
            this.runNonSharedObjects();
            this.runNonSharedRules();
        } else {
            this.runAllObjects();
            this.runAllRules();
        }

        //TODO hack
        this.gameServices.userInterface.toTop();
        this.appServices.logger.debug("Run world");
    }

    deleteWorld() {
        this.destroyWorld();
        this.gameServices.worldStore.clearAll();
        this.appServices.logger.debug("Delete world");
    }

    deleteNonSharedWorld() {
        this.destroyNonSharedWorld();
        this.gameServices.worldStore.clearNonShared();
        this.appServices.logger.debug("Delete non-shared world");
    }

    destroyWorld() {
        this.destroyGameServices();
        this.destroyObjects();
        this.destroyRules();
        this.appServices.logger.debug("Destroy world");
    }

    destroyNonSharedWorld() {
        //TODO shared?
        this.destroyGameServices();
        this.destroyNonSharedObjects();
        this.destroyNonSharedRules();
        //rules?
        this.appServices.logger.debug("Destroy non-shared world elements");
    }

    destroyObjects() {
        this._callForEachObject(this.DESTROY);
    }

    destroyNonSharedObjects() {
        this._callForEachObject(this.DESTROY, false);
    }

    destroyRules(){
        this._callForEachRule(this.DESTROY);
    }

    destroyNonSharedRules() {
        this._callForEachRule(this.DESTROY, false);
    }

    destroyGameServices() {
        let count = 0;
        this.gameServices.forEach(service => {
            service.destroy();
            count++;
        });
        this.appServices.logger.debug(`Destroy game services ${count}`);
    }

    _isMethodExistWithLog(object, method) {
        if (typeof object[method] !== "function") {
            this.appServices.logger.error(`${object.constructor.name} does not have a '${method}' method`);
            return false;
        }
        return true;
    }

    _safeCallObjectMethod(object, key, objectMethod, onErrorRemove) {
        if (this._isMethodExistWithLog(object, objectMethod)) {
            try {
                object[objectMethod]();
            } catch (err) {
                this.appServices.logger.error(err);
                onErrorRemove(key);
                this.appServices.logger.error(`Method ${objectMethod} error, object: ${object.constructor.name}`);
            }
        }
    }

    _callForEachObject(methodName, eachShared = true) {
        this.gameServices.worldStore.forEachObjects((object, id) => {
            if (!eachShared && object.isShared) {
                return;
            }

            this._safeCallObjectMethod(object, id, methodName, (id) => {
                this.gameServices.worldStore.removeObject(id);
            });
        });

    }

    _callForEachRule(methodName, eachShared = true) {
        this.gameServices.worldStore.forEachRules((rule, id) => {
            if (!eachShared && rule.isShared) {
                return;
            }
            this._safeCallObjectMethod(rule, id, methodName, (id) => {
                this.gameServices.worldStore.removeRule(id);
            });
        });
    }

    _callForEachGameService(methodName) {
        this.gameServices.forEach((service, id) => {
            //TODO on service Error.
            this._safeCallObjectMethod(service, id, methodName, (id) => { });
        });
    }

    loadAllGameObjects() {
        this._callForEachObject(this.LOAD);
    }

    loadAllGameRules() {
        this._callForEachRule(this.LOAD);
    }

    runAllObjects() {
        this._callForEachObject(this.RUN);
    }

    runNonSharedObjects() {
        this._callForEachObject(this.RUN, false);
    }

    runNonSharedRules() {
        this._callForEachRule(this.RUN, false);
    }

    runAllRules() {
        this._callForEachRule(this.RUN);
    }

    updateAllRules() {
        this._callForEachRule(this.UPDATE);
    }

    updateAllObjects() {
        this._callForEachObject(this.UPDATE);
    }

    loadAllGameServices() {
        this._callForEachGameService(this.LOAD);
    }

    runAllGameServices() {
        this._callForEachGameService(this.RUN);
    }


    addInitObjectsByClassName(...classNames) {
        classNames.forEach(className => {
            const initComponent = this.initChildGameComponent(className);
            this.gameServices.worldStore.addObject(className.name, initComponent);
        });
    }

    addInitRulesByClassName(...ruleClassNames) {
        ruleClassNames.forEach(ruleName => {
            this.addInitRuleByClassName(ruleName);
        });
    }

    addInitRuleByClassName(ruleName, ruleData) {
        const initRule = this.initRule(ruleName, ruleData);
        this.gameServices.worldStore.addRule(initRule.constructor.name, initRule);
    }

    initChildGameComponent(component) {

        if (!component) {
            throw new TypeError("Empty child game component for initialization");
        }

        let gameComponent = new component(this.appServices, this.game, this.gameServices);

        if (!(gameComponent instanceof GameComponent)) {
            throw new TypeError(`Invalid component type ${component} for initialization, expected ${GameComponent.name} extended instance, but received: ${gameComponent.constructor.name}`);
        }
        return gameComponent;
    }

    initRule(rule, ruleData) {

        if (!rule) {
            throw new TypeError("Empty game rule for initialization");
        }

        let initializedRule = new rule(this.appServices, this.game, this.gameServices, ruleData);

        if (!(initializedRule instanceof BaseRule)) {
            throw new TypeError(`Invalid rule for initialization, expected ${BaseRule.name} extended instance, but received: ${rule.constructor.name}`);
        }
        return initializedRule;
    }

    addDamaged(object) {
        this.gameServices.worldStore.getRule(DamageObjects.name).addDamaged(object);
    }

    addDamagers(object) {
        this.gameServices.worldStore.getRule(DamageObjects.name).addDamagers(object);
    }

    addEnergySource(object){
        this.gameServices.worldStore.getRule(EnergySourceObjects.name).addEnergySource(object);
    }

    destroy(){
        super.destroy();
    }
}