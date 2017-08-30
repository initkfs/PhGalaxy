/*
* @author initkfs
*/
import GameObject from './../../Common/GameObject';

export default class Stars extends GameObject {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this.STAR_ID = "STAR_ID";
        this._tweens = [];
    }

    load() {
        this.game.load.image(this.STAR_ID, this.gameServices.assetManager.withDefaultImagesAssetsPath('space/stars/stars.png'));
    }

    spawn(x, y) {
        const star = this.game.add.sprite(x, y, this.STAR_ID);
        star.anchor.setTo(0.5, 0.5);
        star.alpha = 1;
        let starTween = this.game.add.tween(star).to({ alpha: 0 }, this.game.rnd.between(2000, 6000), "Linear", false, 0, -1);
        starTween.yoyo(true, this.game.rnd.between(2000, 6000));
        this._tweens.push(starTween);

        if (this._stars) {
            this._stars.add(star);
        }
        return star;
    }

    run() {
        this._stars = this.game.add.group();
        const starsLimit = this.appServices.config.spaceStarsCountFactor;

        if (!starsLimit) {
            throw new Error("Stars limit factor is not defined");
        }

        if (typeof starsLimit !== "number" || starsLimit <= 0) {
            throw new Error("Stars limit factor is not correct. Expected positive number");
        }

        for (let i = 0; i < starsLimit; i++) {
            this.spawn(this.game.world.randomX, this.game.world.randomY);
        }
    }

    destroy(){
        this._stars.destroy();
        this._tweens.forEach(tween => {
            tween.stop();
        })
        this._tweens = [];
    }

    update() { 
        this._tweens.forEach((tween) => {
            if (tween.target.inCamera) {
                if (!tween.isRunning) {
                    tween.start();
                } else if (tween.isPaused) {
                    tween.resume();
                }
            } else {
                if (tween.isRunning) {
                    tween.pause();
                }
            }
        });
    }
}
