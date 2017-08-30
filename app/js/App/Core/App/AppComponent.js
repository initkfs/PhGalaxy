/*
* @author initkfs
*/
import AppServiceManager from "./AppServiceManager";

export default class AppComponent {

    constructor(services) {

        if (!(services instanceof AppServiceManager)) {
            throw new TypeError(`Invalid application services received. Services instance must extend the ${AppServiceManager.name} class`);
        }

        this._services = services;
    }

    get appServices() {
        return this._services;
    }
}