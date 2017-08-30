/*
* @author initkfs
*/
import GameComponent from './../Common/GameComponent';
import BaseState from './../States/BaseState';
import EndState from './../States/EndState';
import WorldState from './../States/WorldState';
import Phaser from 'phaser';

export default class GameController extends GameComponent {

    constructor(services, game, gameServices) {
        super(services, game, gameServices);

        this.END_STATE_ID = "END_STATE_ID ";
        this.WORLD_STATE_ID = "WORLD_STATE_ID";
    }

    run() {
        const endState = this._initState(EndState, this.END_STATE_ID);

        endState.onGameResume.add(() => {
            this._startState(this.WORLD_STATE_ID);
        }, this);

        const worldState = this._initState(WorldState, this.WORLD_STATE_ID);

        worldState.onPlayerDead.add(() => {
            this._startState(this.END_STATE_ID);
        }, this);

        this._startState(this.WORLD_STATE_ID);
    }

    _initState(stateClass, stateID) {

        const state = new stateClass(this.appServices, this.game, this.gameServices);

        if (!(state instanceof BaseState)) {
            throw new Error(`Invalid type of state received. Expected: ${BaseState.name}`);
        }

        this._addState(stateID, state, false);
        return state;
    }

    _startState(stateID) {
        this.game.state.start(stateID);
        this.appServices.logger.debug(`Start game state, id: ${stateID}`);
    }

    _addState(stateID, state, isRunning) {
        this.game.state.add(stateID, state, isRunning);
        this.appServices.logger.debug(`Add state, id: ${stateID}`);
    }

    _deleteCurrentState() {
        this.game.state.clearCurrentState();
        this.appServices.logger.debug("Clear current state");
        // this.game.state.remove(this.game.currentState);
    }
}