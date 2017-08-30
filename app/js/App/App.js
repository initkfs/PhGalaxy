/*
* @author initkfs
*/
import AppMainConfig from "./AppMainConfig";
import AppServiceManager from './Core/App/AppServiceManager';
import GameServiceManager from './Game/Services/GameServiceManager';
import GameController from './Game/Controller/GameController';
import Logger from 'js-logger';
import i18next from 'i18next';
import Phaser from 'phaser';
import EventBus from 'eventbusjs';
import JsCookie from 'js-cookie';
import JournalManager from './Game/Services/JournalManager';
import SoundManager from './Game/Services/SoundManager';
import UserInterfaceManager from './Game/Services/UserInterfaceManager';
import WorldStore from './Game/Services/WorldStore';
import AssetManager from './Game/Services/AssetManager';
import GameManager from './Game/Services/GameManager';
import EffectsManager from './Game/Services/EffectsManager';
import GameHelper from './Game/Services/GameHelper';
import GameService from './Game/Services/GameManager';

export default class AppGame {

  constructor() {
    this.config = new AppMainConfig();
    this.appServices;
    this.game;
    this.gameServices;
  }

  run() {
    //application services
    const logger = this.initializeLogger(this.config);

    if (this.config.debug) {
      logger.debug("Debug mode on");
    }

    const translator = this.initializeTranslation(this.config, logger);

    const appServices = new AppServiceManager();
    appServices.config = this.config;
    appServices.logger = logger;
    appServices.translator = translator;
    appServices.eventBus = EventBus;
    appServices.cookie = JsCookie;
    this.appServices = appServices;

    this.game = this.initializeEngine(this.config, logger);

    this.gameServices = new GameServiceManager();
    //TODO extract initializator
    this.gameServices.journal = this._initService(JournalManager);
    this.gameServices.soundManager = this._initService(SoundManager);
    this.gameServices.userInterface = this._initService(UserInterfaceManager);
    this.gameServices.worldStore = this._initService(WorldStore);
    this.gameServices.assetManager = this._initService(AssetManager);
    this.gameServices.gameManager = this._initService(GameManager);
    this.gameServices.effectsManager = this._initService(EffectsManager);
    this.gameServices.gameHelper = this._initService(GameHelper);

    const gameController = new GameController(this.appServices, this.game, this.gameServices);
    gameController.run();
  }

  _initService(clazz) {

    const instance = new clazz(this.appServices, this.game, this.gameServices);

    if (!instance instanceof GameService) {
      throw new TypeError(`Invalid service instance, expected instanceof ${GameService.name}`);
    }

    return instance;
  }

  /*
  @see {@link https://github.com/jonnyreeves/js-logger|js-logger}
  Logger.debug("");
  Logger.info("", window);
  Logger.warn("");
  Logger.error("");
  */
  initializeLogger(config) {

    const appName = config.appName;
    if (!appName) {
      throw new ReferenceError("Application name is not defined for logger");
    }

    const level = config.logMainlevel;
    if (!level) {
      throw new Error("Logger level is not defined");
    }

    const logger = Logger.get(appName);
    Logger.useDefaults({
      defaultLevel: level,
      formatter: (messages, context) => {
        messages.unshift(new Date().toUTCString());
      }
    });

    if (!logger) {
      throw new Error("Logger initialization error");
    }

    const currentLevel = level.name;
    logger.debug(`Logger initialization, name: ${appName}, level: ${level.name}`);

    return logger;
  }

  /*
  @see {@link https://github.com/i18next/i18next|i18next}
  i18next.t('key');
  */
  initializeTranslation(config, logger) {

    const language = config.lang;
    const langResources = config.getLangResources();
    const isDebug = config.debug;

    i18next.init({
      lng: language,
      resources: langResources,
      fallbackLng: language,
      debug: isDebug
    }, (err, t) => {
      if (err !== null && typeof this.logger !== 'undefined') {
        this.logger.error(err);
        return;
      }
      logger.debug(`Translator initialization, language: ${language}, debug: ${isDebug}`);
    });

    //TODO prevent direct access;
    config.clearLangResources();
    logger.debug(`Clear language resources in the config`);
    return i18next;
  }

  initializeEngine(config, logger) {

    const sceneWidth = config.sceneWidth;
    const sceneHeight = config.sceneHeight;
    const sceneID = config.nodeScene;

    const engine = new Phaser.Game(
      sceneWidth,
      sceneHeight,
      Phaser.AUTO,
      sceneID
    );

    if (!engine) {
      throw new Error("Failed engine initialization");
    }

    logger.debug(`Created engine, scene width: ${sceneWidth}, scene height: ${sceneHeight}, DOM node id: ${sceneID}`);

    return engine;
  }
} 