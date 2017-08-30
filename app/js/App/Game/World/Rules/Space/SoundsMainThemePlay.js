/*
* @author initkfs
*/
import BaseRule from './../BaseRule';
import Gamer from './../../Objects/Player/Gamer';
import Portal from './../../Objects/Portal';
import Phaser from 'phaser';

export default class SoundsMainThemePlay extends BaseRule {

    constructor(appServices, game, gameServices, ruleData) {
        super(appServices, game, gameServices, ruleData);

        this._themesFiles = ["Panoramic-Dystopia_Looping.mp3", "Cyber-Teen.mp3", "Sci-Fi-Close-2_Looping.mp3", "Urban-Jungle-2061_Looping.mp3"];
    }

    load() {
        this._themesFiles.forEach((soundName) => {
            this.gameServices.soundManager.loadMusic(soundName);
        })
    }

    run() {

        this._themesFiles.forEach(soundName => {

            let audio = this.gameServices.soundManager.addSound(soundName);
            audio.onStop.add(() => {
                this.playRandomMainTheme()
            });
        });

        // main.loopFull();
        this.playRandomMainTheme();
    }

    playRandomMainTheme() {
        let randomTheme = this._themesFiles[this.game.rnd.between(0, this._themesFiles.length - 1)];
        this.gameServices.soundManager.play(randomTheme);
    }

}