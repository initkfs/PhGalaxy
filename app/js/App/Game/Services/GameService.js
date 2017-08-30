/*
* @author initkfs
*/
import GameComponent from './../Common/GameComponent';

export default class GameService extends GameComponent {

    destroy() {
        //FIXME remove cyclic reference
        //this._gameServices = null;
        //this._appServices = null;
        //this._game = null;
    }
}