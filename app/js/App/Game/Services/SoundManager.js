/*
* @author initkfs
// game.sound.setDecodedCallback([ explosion, sword, blaster ], start, this);
*/
import GameService from './GameService';

export default class SoundManager extends GameService {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this.GAME_SOUNDS_DIR = "sounds";
        this.MUSIC_DIR = "music";

        //FIXME TODO Phaser._sounds is private field
        this._sounds = new Map();
    }

    loadMusic(soundFileName, path = null) {

        if (!path) {
            path = this.buildMusicPath(soundFileName);
        }

        this._loadAudio(soundFileName, path);
    }

    loadSound(soundFileName, path = null) {
        
        if (!path) {
            path = this.buildSoundPath(soundFileName);
        }

        this._loadAudio(soundFileName, path);
    }

    _loadAudio(id, path) {
        this.game.load.audio(id, path);
    }

    addSound(key) {

        let gameAudio = this.game.add.audio(key);

        if (!gameAudio) {
            this.appServices.logger.error(`Audio with id ${id} is empty and not loaded`);
            return null;
        }
        this._sounds.set(key, gameAudio);
        return gameAudio;
    }

    play(id) {

        if (!id) {
            this.appServices.logger.error("Empty id for audio playing");
            return;
        }

        if (!this._sounds.has(id)) {
            this.addSound(id);
        }

        let audio = this._sounds.get(id);

        if (!audio) {
            this.appServices.logger.error(`Audio not found with id: ${id}`);
            return;
        }

        audio.play();
    }

    stopSound(sound) {
        if (sound.isPlaying) {
            sound.stop();
        }
    }

    stopAll() {
        this._sounds.forEach(sound => {
            this.stopSound(sound);
        });
    }

    destroy() {
        this._sounds.forEach(sound => {
            //for the main theme
            sound.onStop.removeAll();
            this.stopSound(sound);
            sound.destroy();
        })
        this._sounds.clear(); 
        this.appServices.logger.debug("Clear sounds");

        super.destroy();
    }

    buildMusicPath(soundPath) {
        return this.gameServices.assetManager.withDefaultAssetsPath(this.GAME_SOUNDS_DIR, this.MUSIC_DIR, soundPath);
    }

    buildSoundPath(soundPath) {
        return this.gameServices.assetManager.withDefaultAssetsPath(this.GAME_SOUNDS_DIR, soundPath);
    }

    get sounds() {
        return this._sounds;
    }
}