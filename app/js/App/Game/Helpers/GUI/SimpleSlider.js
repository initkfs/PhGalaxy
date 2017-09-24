/*
* @author initkfs
*/
import Phaser from 'phaser';

export default class SimpleSlider {

    constructor(game) {

        this.game = game;

        this.sliderX = 0;
        this.sliderY = 0;

        this.sliderWidth = 200;
        this.sliderHeight = 80;

        this.paddingX = 20;
        this.paddingY = 10;

        this.sliderBackground = '#004d40';
        this.sliderTrackBackground = '#a7ffeb';

        this.fixedToCamera = true;

        this.totalValue = 100;
        this._value = this.totalValue;
    }

    createSlider() {

        let bmd = this.game.add.bitmapData(this.sliderWidth, this.sliderHeight);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, this.sliderWidth, this.sliderHeight);
        bmd.ctx.fillStyle = this.sliderBackground;
        bmd.ctx.fill();
        bmd.fixedToCamera = this.fixedToCamera;

        this.bglife = this.game.add.sprite(this.sliderX + bmd.width / 2, this.sliderY + bmd.height / 2, bmd);
        this.bglife.anchor.set(0.5);
        this.bglife.fixedToCamera = this.fixedToCamera;

        bmd = this.game.add.bitmapData(this.sliderWidth - this.paddingX, this.sliderHeight - this.paddingY);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, this.sliderWidth - this.paddingX, this.sliderHeight - this.paddingY);
        bmd.ctx.fillStyle = this.sliderTrackBackground;
        bmd.ctx.fill();


        this.widthLife = new Phaser.Rectangle(0, 0, bmd.width, bmd.height);

        this.life = this.game.add.sprite(this.bglife.world.x - bmd.width / 2, this.bglife.world.y, bmd);
        this.life.fillStyle = true;
        this.life.anchor.y = 0.5;
        this.life.cropEnabled = true;
        this.life.crop(this.widthLife);
        this.life.fixedToCamera = this.fixedToCamera;

        this.widthLifeMaxWidth = bmd.width;
        this.widthLife.width = bmd.width;
    }

    destroy() {
        //TODO destroy all
        this.bglife.destroy();
        this.life.destroy();
    }

    get width() {
        return this.sliderWidth;
    }

    get height() {
        return this.sliderHeight;
    }

    get x() {
        return this.sliderX;
    }

    get y() {
        return this.sliderY;
    }


    toTop() {
        if (this.bglife && this.life) {
            this.bglife.bringToTop();
            this.life.bringToTop();
        }
    }

    set value(value) {

        if (typeof value == 'undefined') {
            throw new Error("Value for slider is empty");
        }

        if (!this.widthLife) {
            throw new Error("Slider not created");
        }

        if (value == this._value) {
            return;
        }

        if (value <= 0) {
            if (this.widthLife.width === 0) {
                return;
            }
            value = 0;
        }

        if (value > this.totalValue) {
            if (this.totalValue === this.widthLife.width) {
                return;
            }
            this.widthLife.width = this.totalValue;
            return;
        }

        const diff = this.widthLifeMaxWidth - this.widthLife.width;
        this._value = diff < value ? diff : value;

        this._value = value;
        let correctedSliderWidth = (this._value / this.totalValue) * this.widthLifeMaxWidth;

        const tween = this.game.add.tween(this.widthLife).to({ width: correctedSliderWidth }, 200, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(() => {
            this.life.updateCrop();
        });

    }
}