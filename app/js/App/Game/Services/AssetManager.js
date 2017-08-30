/*
* @author initkfs
*/
import GameService from './GameService';
import path from 'path';
import Phaser from 'phaser';

export default class AssetManager extends GameService {

    load() { 
        this.EXPLOSION1 = "EXPLOSION1";
        this.game.load.spritesheet(this.EXPLOSION1, this.withDefaultImagesAssetsPath('space/explosion1.png'), 256, 256, 64);

        this.EXPLOSION2 = "EXPLOSION2";
        this.game.load.spritesheet(this.EXPLOSION2, this.withDefaultImagesAssetsPath('space/explosion2.png'), 256, 256, 64);

        this.EXPLOSION3 = "EXPLOSION3";
        this.game.load.spritesheet(this.EXPLOSION3, this.withDefaultImagesAssetsPath('space/explosion3.png'), 256, 256, 64);

        this.EXPLOSION4 = "EXPLOSION4";
        this.game.load.spritesheet(this.EXPLOSION4, this.withDefaultImagesAssetsPath('space/explosion4.png'), 256, 256, 64);

        this.EXPLOSION5 = "EXPLOSION5";
        this.game.load.spritesheet(this.EXPLOSION5, this.withDefaultImagesAssetsPath('space/explosion5.png'), 256, 256, 64);

        this.EXPLOSION6 = "EXPLOSION6";
        this.game.load.spritesheet(this.EXPLOSION6, this.withDefaultImagesAssetsPath('space/explosion6.png'), 256, 256, 64);

        this.EXPLOSION7 = "EXPLOSION7";
        this.game.load.spritesheet(this.EXPLOSION7, this.withDefaultImagesAssetsPath('space/explosion7.png'), 256, 256, 64);

        let soundManager = this._gameServices.soundManager;

        this.EXPLOSION_SOUND1 = "explosion1.wav";
        soundManager.loadSound(this.EXPLOSION_SOUND1, soundManager.buildSoundPath(this.EXPLOSION_SOUND1));

        this.EXPLOSION_SOUND2 = "explosion2.wav";
        soundManager.loadSound(this.EXPLOSION_SOUND2, soundManager.buildSoundPath(this.EXPLOSION_SOUND2));
    }

    spriteFromPatternName(name, count, callbackSpriteKey) {

        if (!Number.isInteger(count) || count <= 0) {
            throw new Error(`Invalid count for loading sprite: ${count}`);
        }

        for (let i = 0; i < count; i++) {
            callbackSpriteKey(`${name}${i}`);
        }
    }

    loadManyImages(filePathPattern, count) {
        this.loadManyFiles(filePathPattern, count, (fileID, filePath) => {
            this.game.load.image(fileID, filePath);
        });
    }

    loadManySpriteSheets(filePathPattern, count, width, height, frameCount) {
        this.loadManyFiles(filePathPattern, count, (fileID, filePath) => {
            this.game.load.spritesheet(fileID, filePath, width, height, frameCount);
        });
    }

    loadManyFiles(filePathPattern, count, callback) {
        //TODO check if exist, refactor
        const parentDirectory = path.dirname(filePathPattern);
        const fileExtension = path.extname(filePathPattern);
        const shortFileName = path.basename(filePathPattern, fileExtension);

        if (!Number.isInteger(count) || count <= 0) {
            throw new Error(`Invalid count for loading files: ${count}`);
        }

        for (let i = 0; i < count; i++) {
            callback(`${shortFileName}${i}`, path.join(parentDirectory, `${shortFileName}${i}${fileExtension}`));
        }
    }

    defaultAssetsPath() {
        return this.appServices.config.assetPath;
    }

    defaultImagesAssetsPath() {
        return this.appServices.config.assetImagesPath;
    }

    withDefaultAssetsPath(...paths) {
        const gameAssets = this.defaultAssetsPath();
        return path.join(gameAssets, ...paths);
    }

    withDefaultImagesAssetsPath(...paths) {
        const gameAssets = this.defaultImagesAssetsPath();
        return path.join(gameAssets, ...paths);
    }


    getArrayValueWithLang(source) {

        const lang = this.appServices.translator.language;

        if (!lang) {
            this.appServices.logger.error("Languange value is empty");
            //FIXME return "", null?
            return null;
        }

        if (!source.hasOwnProperty(lang)) {
            this.appServices.logger.error(`Not found names for language ${lang} in source`);
            return null;
        }

        const array = source[lang];
        if (!(Array.isArray(array))) {
            this.appServices.logger.error("Source for getting value with language does not contains array");
            return null;
        }

        return array[this.game.rnd.between(0, array.length - 1)];
    }

    destroy(){
        super.destroy();
    }
}