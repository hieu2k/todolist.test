"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Work {
    constructor(name, id = 1, day, month, year) {
        this._name = name;
        this._time = time;
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(v) {
        this._name = v;
    }
    get time() {
        return this._time;
    }
    set time(v) {
        this._time = v;
    }
    get id() {
        return this._id;
    }
    set id(v) {
        this._id = v;
    }
}
exports.Work = Work;
