/*
* @author initkfs
*/
import GameObject from './../Common/GameObject';
import Phaser from 'phaser';

export default class Console extends GameObject {

    run() {
        //TODO move to config
        let consoleKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TAB);

        consoleKey.onDown.add(() => {
            let commandString = prompt("Enter game command", "command");

            if (!commandString) {
                return;
            }

            let commandArray = commandString.match(/\S+/g);

            if (!commandArray.length == 2) {
                return;
            }

            const command = commandArray[0];

            switch (command) {
                case 'spawn':
                    this._spawn(commandArray[1]);
                    break;
                default:
                    //TOOD error, log?
                    this.appServices.logger.error(`Console: not found command: ${command}`);
                    return;
            }
        }, this);
    }

    _spawn(target) {
        
        if (!target) {
            this.appServices.logger.error("Target for spawn is not defined");
            return;
        }

        if (!this._gameServices.worldStore.hasObject(target)) {
            this.appServices.logger.error(`Not found object: ${target} for spawn`);
            return;
        }

        let object = this._gameServices.worldStore.getObject(target);
        const x = this.game.input.mousePointer.x + this.game.camera.x;
        const y = this.game.input.mousePointer.y + this.game.camera.y;;
        this.appServices.logger.debug(`Request spawn object: ${target}, x: ${x}, y: ${y}`);
        object.spawn(x,y);
    }
}