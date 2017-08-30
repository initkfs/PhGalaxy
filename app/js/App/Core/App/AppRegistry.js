/*
* @author initkfs
*/
import Lang from 'lodash/lang';

export default class AppRegistry {

  constructor() {
    this._items = new Map();
  }

  set(key, value) { 

    if (!key) {
      throw new Error(`Empty key for application registry received, with value: ${value}`);
    } 

    if (!Lang.isString(key)) {
      throw new TypeError(`Invalid registry key received. Expected string, but received: ${typeof key}`);
    }

    if (!value) {
      throw new Error(`Empty value received for the application registry, with key: ${key}`);
    }

    if(!Lang.isObject(value)){
      throw new Error(`Invalid value for registry, expected string, but received: ${typeof value}`);
    }

    this._items.set(key, value);
  }

  has(key) {

    if (!key) {
      throw new TypeError("Empty key received for 'has' checking in the registry");
    }

    return this._items.has(key);
  }

  delete(key) {

    if (!this.has(key)) {
      throw new Error(`Item for deleting not found in the application registry, key: ${key}`);
    }

    this._items.delete(key);
  }

  clear() {
    this._items.clear();
  }

  get(key) {

    if (!this.has(key)) {
      throw new Error(`Key '${key}' not found in the application registry. Cannot get target object`);
    }

    return this._items.get(key);
  }

  forEach(callable) {
    this._items.forEach((item, key) => {
      callable(item, key);
    });
  }
}