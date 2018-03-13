import { Manager } from './../Modal';
import PopUp from './Popup';
import Tip from './Tip';
import Toast from './Toast';

class popup extends Manager {
    constructor(){
        super();
        //是否存在tip
        this._hasTip=false;
    }
    dialog ( title , message , buttons = [] ) {
        const _self = this;
        const _popup = this.create(PopUp,{
            position:`center`,
            maskDuration:200,
            contentDuration:200,
            show:false
        },{
            title:title,
            message:message,
            buttons:buttons,
            handelClick:()=>_popup.show=false
        });
        _popup.aniCallback = function () {
            if (!this.show) {
                _self.close(this);
            }
        };
        requestAnimationFrame(() => {
            _popup.show = true;
        });
        return _self;
    }
    alert ( msg  , cb ){
        this.dialog(`提示`,`${msg}`, [{
            text:`确定`, onclick:cb
        }]);
        return this;
    }
    confirm ( title=`提示` , msg , ok , cancel ){
        this.dialog(`${title}`, `${msg}`,
            [{
                text:`取消`,
                onclick:cancel
            },{
                text:`确定`,
                onclick:ok
            }]
        );
        return this;
    }
    tip(msg ,cb=()=>{}){
        const _self = this;
        if(this._hasTip) {
            return false;
        }
        this._hasTip = true;
        const _tip = this.create(Tip,{
            position:`top`,
            maskDuration:0,
            contentDuration:200,
            show:false,
            opacity:0,
            height:55
        },{
            message:msg||``
        });
        _tip.aniCallback = function () {
            if (!this.show) {
                _self.close(this);
                _self._hasTip = false;
                cb();
            }
        };
        requestAnimationFrame(() => {
            _tip.show=true;
            setTimeout( () => {
                _tip.show=false;
            },1500)
        });
    }

    toast(msg){
        const _self = this;
        const _toast = this.create(Toast,{
            position:`center`,
            maskDuration:300,
            contentDuration:300,
            show:false,
            opacity:.1
        },{
            message:msg||``
        });
        _toast.aniCallback = function () {
            if (!this.show) {
                _self.close(this);
            }
        };
        requestAnimationFrame(() => {
            _toast.show=true;
            setTimeout( () => {
                _toast.show=false;
            },1500)
        });
    }
}

export default popup;


