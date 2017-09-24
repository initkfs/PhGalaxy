/*
* @author initkfs
*/
import path from 'path';
import GameComponent from './../Common/GameComponent';
import BaseState from './BaseState';
import Phaser from 'phaser';
import Gamer from './../World/Objects/Player/Gamer';
import Console from './../World/Console';
import Stars from './../World/Objects/Stars';
import Portal from './../World/Objects/Portal';
import Nebulae from './../World/Objects/Nebulae';
import StarWind from './../World/Objects/StarWind';
import Asteroids from './../World/Objects/Asteroids/Asteroids';
import GalaxySystem from './../World/Objects/GalaxySystem';
import Planets from './../World/Objects/Planets';
import Giants from './../World/Objects/Giants';
import StarsPulsating from './../World/Objects/StarsPulsating';
import SpaceStation from './../World/Objects/SpaceStation';
//Rules
import PlayerWithStarfieldMotion from './../World/Rules/Space/PlayerWithStarfieldMotion';
import StarWindWithCameraMotion from './../World/Rules/Space/StarWindWithCameraMotion';
import PlayerMotion from './../World/Rules/Space/PlayerMotion';
import DestroyObjects from './../World/Rules/Space/DestroyObjects';
import UpdateGUI from './../World/Rules/Space/UpdateGUI';
import DamageObjects from './../World/Rules/Space/DamageObjects';
import ChangeWorld from './../World/Rules/Space/ChangeWorld';
import SoundsMainThemePlay from './../World/Rules/Space/SoundsMainThemePlay';
import SpawnCorrect from './../World/Rules/Space/SpawnCorrect';
import ExplodeStars from './../World/Rules/Space/ExplodeStars';
import EnergySourceObjects from './../World/Rules/Space/EnergySourceObjects';


export default class WorldState extends BaseState {

  constructor(appServices, game, gameServices) {
    super(appServices, game, gameServices);

    this.onPlayerDead = new Phaser.Signal();
  }

  preload() {
  }

  create() {
    super.create();

    const config = this.appServices.config;
 
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    const worldWidth = config.worldWidth;
    const worldHeight = config.worldHeight;
    this.game.world.setBounds(0, 0, worldWidth, worldHeight);

    this.game.load.onLoadStart.add(this.loadStart, this);
    this.game.load.onFileComplete.add(this.fileComplete, this);
    this.game.load.onLoadComplete.add(this.createWorld, this);

    //loader text
    this.text = this.game.add.text(32, 32, 'Click to start load', { fill: this._appServices.config.colorAccent });

    //Create world objects
    let gameManager = this.gameServices.gameManager;
    gameManager.addInitObjectsByClassName(Console);
    gameManager.addInitObjectsByClassName(
      GalaxySystem,
      Stars,
      StarsPulsating,
      Planets,
      Giants,
      Asteroids,
      SpaceStation,
      Gamer,
      StarWind,
      Portal,
      Nebulae
    );

    //Create world rules
    gameManager.addInitRulesByClassName(
      SoundsMainThemePlay,
      PlayerWithStarfieldMotion,
      StarWindWithCameraMotion,
      PlayerMotion,
      DestroyObjects,
      DamageObjects,
      SpawnCorrect,
      UpdateGUI,
      ChangeWorld,
      ExplodeStars, 
      EnergySourceObjects
    );

    //services first
    gameManager.loadAllGameServices();
    gameManager.loadAllGameObjects();
    gameManager.loadAllGameRules();
    this.game.load.start();
  }

  createWorld() {
    this.appServices.config.isNewSystem = true;
    this.gameServices.gameManager.runWorld();

    this._setOnPlayerDeadHandler();
    this._setOnChangeWorldHandler();

    this.loadComplete();
    this._appServices.config.isNewSystem = false;
  }

  _setOnChangeWorldHandler() {
    let changeWorldRule = this.gameServices.worldStore.getRule(ChangeWorld.name);
    changeWorldRule.onChange.add(() => {
      this._changeWorld();
    });
  }

  _setOnPlayerDeadHandler() {
    let destroyRule = this.gameServices.worldStore.getRule(DestroyObjects.name);

    destroyRule.onPlayerDead.add(() => {
      this.gameServices.gameManager.deleteNonSharedWorld();

      let dieMessage = `${this._getPlayerName()} ${this.appServices.translator.t("event-player-die")}`;
      this.gameServices.journal.append(dieMessage);

      this.onPlayerDead.dispatch();
    });
  }

  _getGalaxyName() {
    const galaxy = this.gameServices.worldStore.getObject(GalaxySystem.name).object;
    return galaxy.name;
  }

  _getPlayerName() {
    const player = this.gameServices.worldStore.getObject(Gamer.name);
    return player.ship.human.name;
  }

  _changeWorld() {
    const player = this.gameServices.worldStore.getObject(Gamer.name);

    let outSystemMessage = `${this._getPlayerName()} ${this.appServices.translator.t("event-galaxy-out")} ${this._getGalaxyName()}`;
    this.gameServices.journal.append(outSystemMessage);

    this.gameServices.gameManager.changeWorld();

    let inSystemMessage = `${this._getPlayerName()} ${this.appServices.translator.t("event-galaxy-in")}  ${this._getGalaxyName()}`;
    this.gameServices.journal.append(inSystemMessage);

    this._setOnPlayerDeadHandler();
    this._setOnChangeWorldHandler();

    player.bringToTop();
  }

  loadStart() {
    this.text.setText(this.appServices.translator.t("game-main-loader-load"));
  }

  fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    const translator = this.appServices.translator;
    const loadMessage = translator.t("game-main-loader-load");
    const totalMessage = translator.t("game-main-loader-loaded");
    const totalFilesMessage = translator.t("game-main-loader-total");
    this.text.setText(`${loadMessage} ${progress}%. ${totalMessage} ${totalLoaded}. ${totalFilesMessage} ${totalFiles}`);
  }

  loadComplete() {
    this._appServices.logger.debug("World state: load complete");
    if (this.text) {
      this.text.kill();
    }
  }

  update() {
    this.gameServices.gameManager.updateAllObjects();
    this.gameServices.gameManager.updateAllRules();
  }

  shutdown() {
  }

  render() {
  }
}
