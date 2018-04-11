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

    _endAction() {
        const me = this;
        if(!me.id) {
            return false;
        }
        me._s.endX = me.x;
        me._s.endY = me.y;
        me.moving = false;

        if (me.options.scrollBarFade && !me.fading) {
            me.fading = true ;// 标记渐隐滚动条
            if (me.scrollBarX) me._fade(me.scrollBarX, 2000);
            if (me.scrollBarY) me._fade(me.scrollBarY, 2000);
        }
        me._execEvent('scrollEnd');
    }

}