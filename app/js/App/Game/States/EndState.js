/*
* @author initkfs
*/
import BaseState from './BaseState';
import Phaser from 'phaser';
import Gamer from './../World/Objects/Player/Gamer';

export default class EndState extends BaseState {

  constructor(appServices, game, gameServices) {
    super(appServices, game, gameServices);
    
    this.onGameResume = new Phaser.Signal();
  }

  preload() {
  }

  create() {

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    let playerDieMessage = this.appServices.translator.t("end-player-die");
    let shipDieMessage = this.appServices.translator.t("end-player-ship-die");
    let continueMessage = this.appServices.translator.t("end-start");

    let player = this.gameServices.worldStore.getObject(Gamer.name);
    let ship = player.ship;
    let human = ship.human;
    
    let content = `${human.name} ${playerDieMessage}
    '${ship.name}' ${shipDieMessage}
    ${continueMessage}
    `;

    let text = this.game.add.text(this.game.camera.width / 2, this.game.camera.height / 2, content, { font: "24px Arial", fill: this.appServices.config.colorAccent,wordWrap: true, wordWrapWidth: 650 ,  align: "center" });

    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputUp.add(this._continueGame, this);
  }

  _continueGame() {
    this.gameServices.gameManager.deleteWorld();
    this.onGameResume.dispatch();
  }

  update() {
  }

  shutdown() {

  }

  render() {

  }
}
