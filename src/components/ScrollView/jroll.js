import jRoll from 'jroll';
import "jroll-pulldown";

//增加事件移除
export default class JR extends jRoll {

    constructor() {
        super(...arguments);
    }

    off(event, callback) {
        const {_event = {}} = this;
        if (!!_event[event] && !!_event[event].length) {
            if (!!callback) {
                const i = _event[event].findIndex(f => f === callback);
                this._event[event].splice(i, 1);
            } else {
                this._event[event] = [];
            }
        }
        return this;
    }

}