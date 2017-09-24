/*
* @author initkfs
*/
import GameService from './GameService';
import Phaser from 'phaser';
import SimpleSlider from './../Helpers/GUI/SimpleSlider';

export default class UserInterfaceManager extends GameService {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);
        //TODO extract Toolbar class
        this.elementSpace = 5;
        this.separator = 30;
        this.slidersWidth = 105;
        this.sliderHeight = 35;

        this.IMAGE_GUI_DIRECTORY = "gui";
        this.HEALTH_ICON_ID = "HEALTH_ICON_ID";
        this.ENERGY_ICON_ID = "ENERGY_ICON_ID";
        this.MOBILE_FIRE = "fire.png";

        this.onFireMain = new Phaser.Signal();
    }

    load() {
        this.game.load.image(this.HEALTH_ICON_ID, this.gameServices.assetManager.withDefaultImagesAssetsPath(this.IMAGE_GUI_DIRECTORY, 'health.png'));
        this.game.load.image(this.ENERGY_ICON_ID, this.gameServices.assetManager.withDefaultImagesAssetsPath(this.IMAGE_GUI_DIRECTORY, 'energy.png'));


        if (this.appServices.config.mobile) {
            this.game.load.image(this.MOBILE_FIRE, this.gameServices.assetManager.withDefaultImagesAssetsPath(this.IMAGE_GUI_DIRECTORY, this.MOBILE_FIRE));
        }

        this.appServices.logger.debug('Load game GUI');
    }

    destroy() {
        this.imageHealth.destroy();
        this.imageEnergy.destroy();

        if (this.sliderEnergy) {
            this.sliderEnergy.destroy();
            this.sliderEnergy = null;
        }

        if (this.sliderHealth) {
            this.sliderHealth.destroy();
            this.sliderHealth = null;
        }

        if (this.mobileFire) {
            this.mobileFire.destroy();
        }

       // this.onFireMain.removeAll();
       super.destroy();
    }

    _getNewPosition(prevNode, separator = false) {
        let x = prevNode.x + prevNode.width + this.elementSpace;
        if (separator) {
            x += this.separator;
        }
        let y = prevNode.y;
        return new Phaser.Point(x, y);
    }

    _initSlider(slider, prevNode, background, trackColor) {
        let sliderPosition = this._getNewPosition(prevNode);
        slider.sliderX = sliderPosition.x;
        slider.sliderY = sliderPosition.y;
        slider.sliderWidth = this.slidersWidth;
        slider.sliderHeight = this.sliderHeight;
        slider.sliderBackground = background;
        slider.sliderTrackBackground = trackColor;
    }

    run() {

        //Change world
        if (this.sliderHealth || this.sliderEnergy) {
            return;
        }

        let cameraBounds = this.gameServices.gameHelper.getVisualCameraBounds();

        this._fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
        this._fireButton.onDown.add(this._fire, this);

        this.iconsBackground = this.gameServices.gameHelper.toTintColor(this.appServices.config.colorAccent);


        //TODO correct start position?
        this.imageHealth = this.game.add.sprite(0, 0, this.HEALTH_ICON_ID);
        this.imageHealth.tint = this.iconsBackground;
        this.imageHealth.fixedToCamera = true;

        console.log(this.imageHealth.getBounds());

        if (this.appServices.config.mobile) {

            this.mobileFire = this.game.add.sprite(0, 0, this.MOBILE_FIRE);
            this.mobileFire.anchor.setTo(0.5, 0.5);
            this.mobileFire.x += this.mobileFire.width / 2;
            this.mobileFire.y += this.imageHealth.getBounds().height + this.mobileFire.height;
            this.mobileFire.fixedToCamera = true;

            this.mobileFire.inputEnabled = true;
            this.mobileFire.events.onInputDown.add(this._fire, this);
        }

        let trackColor = this.appServices.config.colorAccent;

        this.sliderHealth = new SimpleSlider(this.game);
        this._initSlider(this.sliderHealth, this.imageHealth, '#00685e', trackColor);
        this.sliderHealth.createSlider();

        let imageEnergyPosition = this._getNewPosition(this.sliderHealth, true);
        this.imageEnergy = this.game.add.sprite(imageEnergyPosition.x, imageEnergyPosition.y, this.ENERGY_ICON_ID);
        this.imageEnergy.tint = this.iconsBackground;

        this.imageEnergy.fixedToCamera = true;

        this.sliderEnergy = new SimpleSlider(this.game);
        this._initSlider(this.sliderEnergy, this.imageEnergy, '#00685e', trackColor);
        this.sliderEnergy.createSlider();
    }

    _fire() {
        this.onFireMain.dispatch();
    }

    toTop() {
        this.sliderHealth.toTop();
        this.sliderEnergy.toTop();
        this.imageHealth.bringToTop();
        this.imageEnergy.bringToTop();

        if (this.mobileFire) {
            this.mobileFire.bringToTop();
        }

    }

    update() {
        this.sliderHealth.update();
        this.sliderEnergy.update();
    }

    set health(value) {
        this.sliderHealth.value = value;
    }

    set maxHealth(maxHealth) {
        this.sliderHealth.totalValue = maxHealth;
    }

    set energy(value) {
        this.sliderEnergy.value = value;
    }

    set maxEnergy(maxEnergy) {
        this.sliderEnergy.totalValue = maxEnergy;
    }

    get fireButton() {
        return this._fireButton;
    }
}