"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class listWork {
    constructor() {
       
        this.Works = [];
        this._totalWork = 0;
    }
    getWorkById(id) {
        for (let i = 0; i < this.Works.length; i++) {
            if (this.Works[i].id === id) {
                return this.Works[i];
            }
        }
    }
    getWorks() {
        return this.Works;
    }
    addWork(){
       
    }

    //get position
    getPositionWork(work) {
        let total = this.Works.length;
        for (let i = 0; i < total; i++) {
            if (this.Works[i].id === work.id) {
                return i;
            }
        }
        return -1;
    }
    deleteWork(work) {
        let position = this.getPositionWork(work);
        if (position > -1) {
            this._totalWork--;
            this.Works.splice(position, 1);
        }
    }
    deleteAllWork() {
    }
    
    showWorkFinishInHTML() {
        return "";
    }
    get totalWork() {
        return this._totalWork;
    }
    set totalWork(v) {
        this._totalWork = v;
    }
}
exports.listWork = listWork;
