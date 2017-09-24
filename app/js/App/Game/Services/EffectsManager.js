/*
* @author initkfs
*/
import GameService from './GameService';
import Phaser from 'phaser';
import GameComponent from './../Common/GameComponent';
import GameObject from './../Common/GameObject';
import BaseRule from './../World/Rules/BaseRule';

export default class GameManager extends GameService {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);
        this._effectsCache = [];
    }

    _cleanCacheEffects() {

        this._effectsCache.forEach((spriteEffect, index) => {

            if (!spriteEffect.animations) {
                //TODO log?
                return;
            } else {
                const animation = spriteEffect.animations.currentAnim;

                if (!animation) {
                    return;
                }

                if (animation.isFinished) {
                    spriteEffect.destroy();
                    //TODO unsafe reindex
                    this._effectsCache.splice(index, 1);
                }
            }
        });

        this.appServices.logger.debug(`Clear effects cache, count now: ${this._effectsCache.length}`);
    }

    withSpriteEffect(sprite, effectSpriteID, effectSoundID, frameRate = 30) {

        const x = sprite.x;
        const y = sprite.y;

        //TODO check cache
        const effect = this.game.add.sprite(x, y, effectSpriteID);
        effect.anchor.setTo(0.5, 0.5);
        this._effectsCache.push(effect);

        const anim = effect.animations.add('run');
        anim.onComplete.add(() => {
            this._cleanCacheEffects();
        });

        effect.animations.play('run', frameRate, false);

        if (effectSoundID) {
            this.gameServices.soundManager.play(effectSoundID);
        }
    }

    damageEffect(sprite, damageSpriteID, damageSoundID) {
        this.withSpriteEffect(sprite, damageSpriteID, damageSoundID);
    }

    destroyEffect(sprite, explosionSpriteID, explosionSoundID) {
        this.withSpriteEffect(sprite, explosionSpriteID, explosionSoundID);
        sprite.destroy();
    }

    runAnimationIfInCamera(sprites) {

        if (!sprites) {
            //TODO log?
            return;
        }

        sprites.forEach((sprite) => {

            if (sprite.animations) {

                let currentAnimation = sprite.animations.currentAnim;

                if (sprite.inCamera) {
                    if (!currentAnimation.isPlaying || currentAnimation.isPaused) {
                        currentAnimation.play();
                    }
                } else {
                    if (currentAnimation.isPlaying) {
                        currentAnimation.stop();
                    }
                }
            }
        });
    }

    destroy() {
        this._effectsCache.forEach(spriteEffect => {
            spriteEffect.destroy();
        });
        this._effectsCache = [];

        super.destroy();
    }
}