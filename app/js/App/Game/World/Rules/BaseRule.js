/*
* @author initkfs
*/
import GameComponent from './../../Common/GameComponent';

export default class BaseRule extends GameComponent {

     constructor(appServices, game, gameServices, ruleData) {
        super(appServices, game, gameServices);

        this._ruleData = ruleData;
        this._created = false;
    }

    set created(value){ 
        this._created = value;
    }

    get isCreated(){
        return this._created;
    }

    get ruleData(){
        return this._ruleData;
    }
}