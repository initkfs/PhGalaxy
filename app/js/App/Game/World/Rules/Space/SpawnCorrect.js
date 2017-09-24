/*
* @author initkfs
*/
import BaseRule from './../BaseRule';
import Phaser from 'phaser';
import Asteroids from './../../Objects/Asteroids/Asteroids';
import Giants from './../../Objects/Giants';
import Portal from './../../Objects/Portal';

export default class SpawnCorrect extends BaseRule {

    constructor(appServices, game, gameServices, ruleData) {
        super(appServices, game, gameServices, ruleData);

    }

    run() {
        //nope
        //Phaser.Rectangle.containsPoint(giantBounds, spawnPoint)

        //TODO move to update?
        this.correctAsteroidWithGiants();
        this.correctAsteroidWithPortal();
    }

    moveSecond(firstGroup, secondGroup) {

        firstGroup.forEach(firstObject => {

            secondGroup.forEach(secondObject => {

                if (this.game.physics.arcade.overlap(firstObject, secondObject)) {
                    secondObject.x += firstObject.width + secondObject.width;
                    secondObject.y += firstObject.height + secondObject.height;
                }

            });
        });
    }

    correctAsteroidWithPortal() {
        const portal = this.gameServices.worldStore.getObject(Portal.name).object;
        const asteroids = this.gameServices.worldStore.getObject(Asteroids.name).object;
        this. moveSecond(portal, asteroids);
    }

    correctAsteroidWithGiants() {
        const giants = this.gameServices.worldStore.getObject(Giants.name).object;
        const asteroids = this.gameServices.worldStore.getObject(Asteroids.name).object;
        this.moveSecond(giants, asteroids);
    }


}