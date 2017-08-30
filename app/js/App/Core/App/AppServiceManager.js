/*
* @author initkfs
*/
import AppRegistry from "./AppRegistry";

export default class AppServiceManager extends AppRegistry {

    constructor() {
        super();
        this.CONFIG_KEY = "CONFIG";
        this.LOGGER_KEY = "LOGGER";
        this.TRANSLATOR_KEY = "TRANSLATOR";
        this.EVENTBUS_KEY = "EVENTBUS";
        this.COOKIE_MANAGER_KEY = "COOKIE_MANAGER";
    }

    get config() {
        return this.get(this.CONFIG_KEY);
    }

    set config(config) {
        this.set(this.CONFIG_KEY, config);
    }

    get logger() {
        return this.get(this.LOGGER_KEY);
    }

    set logger(logger) {
        this.set(this.LOGGER_KEY, logger);
    }

    get translator() {
        return this.get(this.TRANSLATOR_KEY);
    }

    set translator(translator) {
        this.set(this.TRANSLATOR_KEY, translator);
    }

    get eventbus() {
        return this.get(this.EVENTBUS_KEY);
    }

    set eventbus(eventbus) {
        this.set(this.EVENTBUS_KEY, eventbus);
    }

    get cookie() {
        return this.get(this.COOKIE_MANAGER_KEY);
    }

    set cookie(cookieManager) {
        this.set(this.COOKIE_MANAGER_KEY, cookieManager);
    }
}