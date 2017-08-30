/*
* @author initkfs
*/
import AppComponent from './../../Core/App/AppComponent';

export default class BaseGameComponent extends AppComponent {

    constructor(appServices, game) {

        super(appServices);

        if (!game) {
            throw new TypeError('Empty game instance received for component');
        }

        this._game = game;
    }

    get game() {
        return this._game;
    }
}