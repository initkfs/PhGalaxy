/*
* @author initkfs
*/
import Logger from 'js-logger';
import path from 'path';

export default class AppMainConfig {

  constructor() {
    this.appName = "Galaxy";
    this.appVersion = "0.0.1a";
    this.debug = true;
    this.author = "initkfs";
    this.logMainlevel = Logger.DEBUG;
    this.lang = 'ru';
    this.nodeJournalID = "game-journal";
    this.nodeProfilerID = "game-profiler";
    this.nodeScene = 'galaxy-world';
    this.sceneWidth = 1000;
    this.sceneHeight = 630;
    this.worldWidth = 3200;
    this.worldHeight = 3200;
    this.assetPath = "assets/dev/game";
    this.assetImagesPath = path.join(this.assetPath, "images");
    this.spaceStarsCountFactor = 90;
    this.colorAccent = "#84ffff";
    this.asteroidsCount = 10;
    this.planetsCount = 7 ;
    this.starsPulsatingCount = 40;
    this.isNewSystem = true;
    this.mobile = false;
    this.galaxyColors = ["#fcff00", "#cfff00", "#a900b4", "#f337ff", "#1d72ff", "#0446b4", "#00ccff"];

    this.humanNames = {
      ru: ['Алексей', 'Олег', 'Николай', 'Антон', 'Федор', 'Олег', 'Богдан', 'Вадим', 'Даниил', 'Леонид', 'Никита']
    };
    this.shipNames = {
      ru: ['Звезда', 'Возмездие', 'Странник', 'Крыло времени', 'Скиталец', 'Квазар', 'Скорость', 'Союз']
    };
    this.langResources = {
      ru: {
        translation: {
          "game-main-loader-load": "Загрузка игровых файлов:",
          "game-main-loader-loaded": "Загружено:",
          "game-main-loader-total": "Всего:",
          "event-galaxy-created": "В облаках раскаленного газа и звездной пыли появилась на свет очередная галактика. Новые приключения ждут в системе",
          "event-galaxy-out": "покинул систему",
          "event-galaxy-in": "теперь находится в системе",
          "event-human-created": "готов к космическим приключениям",
          "event-ship-created": "мчится, обгоняя космический ветер, новенький корпус искрится в потоках звездного света.",
          "event-nebula-created": "Среди бесконечных скоплений звезд зажглись туманности.",
          "event-pulsar": "Где-то рядом погибли звезды.",
          "end-start": "Нажмите, чтобы начать новую игру.",
          "event-player-die" : "бесславно погиб в пучинах космоса",
          "end-player-die" : "нашел свою смерть среди бесконечных звезд." ,
          "end-player-ship-die" : "пополнит своими обломками пучины космоса, напоминая другим более удачным пилотам о незавидной и опасной участи космического приключенца." ,
        }
      }
    };
  }

  getLangResources() {
    return this.langResources;
  }

  clearLangResources() {
    delete (this.langResources);
  }
}

