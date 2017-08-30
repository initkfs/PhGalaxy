/*
* @author initkfs
*/
import AppRegistry from "./../../Core/App/AppRegistry";
import JournalManager from "./../Services/JournalManager";
import SoundManager from "./../Services/SoundManager";
import UserInterfaceManager from "./../Services/UserInterfaceManager";
import WorldStore from "./../Services/WorldStore";
import AssetManager from "./../Services/AssetManager";
import GameManager from "./../Services/GameManager";
import GameService from "./GameService";


export default class GameServiceManager extends AppRegistry {

    constructor() {
        super();
        this.JOURNAL_KEY = "JOURNAL_KEY";
        this.SOUND_MANAGER_KEY = "SOUND_MANAGER_KEY";
        this.USER_INTERFACE_KEY = "USER_INTERFACE_KEY";
        this.WORLD_STORE_KEY = "WORLD_STORE_KEY";
        this.ASSET_MANAGER_KEY = "ASSET_MANAGER_KEY";
        this.GAME_MANAGER_KEY = "GAME_MANAGER_KEY";
        this.GAME_EFFECTS_KEY = "GAME_EFFECTS_KEY";
        this.GAME_HELPER_KEY = "GAME_HELPER_KEY";
    }
    /*
    * @Override
    */
    set(key, value) {

        if (!value || !(value instanceof GameService)) {
            throw new Error(`Invalid game service received. Expected instance of ${GameService.name}`);
        }

        super.set(key, value);
    }

    get journal() {
        return this.get(this.JOURNAL_KEY);
    }

    set journal(journalManager) {
        this.set(this.JOURNAL_KEY, journalManager);
    }

    get soundManager() {
        return this.get(this.SOUND_MANAGER_KEY);
    }

    set soundManager(soundManager) {
        this.set(this.SOUND_MANAGER_KEY, soundManager);
    }

    get userInterface() {
        return this.get(this.USER_INTERFACE_KEY);
    }

    set userInterface(userInterfaceManager) {
        this.set(this.USER_INTERFACE_KEY, userInterfaceManager);
    }

    get worldStore() {
        return this.get(this.WORLD_STORE_KEY);
    }

    set worldStore(worldStore) {
        this.set(this.WORLD_STORE_KEY, worldStore);
    }

    get assetManager() {
        return this.get(this.ASSET_MANAGER_KEY);
    }

    set assetManager(assetManager) {
        this.set(this.ASSET_MANAGER_KEY, assetManager);
    }

    get gameManager() {
        return this.get(this.GAME_MANAGER_KEY);
    }

    set gameManager(gameManager) {
        this.set(this.GAME_MANAGER_KEY, gameManager);
    }

    get effectsManager() {
        return this.get(this.GAME_EFFECTS_KEY);
    }

    set effectsManager(gameManager) {
        this.set(this.GAME_EFFECTS_KEY, gameManager);
    }

    get gameHelper() {
        return this.get(this.GAME_HELPER_KEY);
    }

    set gameHelper(gameHelper) {
        this.set(this.GAME_HELPER_KEY, gameHelper);
    }
}