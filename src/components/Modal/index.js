import Vue from 'vue';

import Modal from './Modal';

import Node from './default'

import Popup from './Popup';

class ModalManager {

    _extend = (o,n) => Object.assign(o,n);

    _create = ( component , modalOpts = {}, contentOpts={} ) => {
        const ModalComponent   = Vue.extend(Modal);
        const contentComponent = Vue.extend(component);
        const modal   = new ModalComponent({propsData:modalOpts});
        const content = new contentComponent({
            propsData:this._extend(
                {$$modal:modal},
                contentOpts
            )
        });
        modal.$mount(this.$createElement());
        content.$mount(this.$find(modal.$el,`[modal-content]`));
        modal.content = content;
        return modal;
    };

    $find=( parent , target )=>{
      return parent.querySelector(target);
    };

    $createElement = () => {
        const el = document.createElement('div');
        this.$root().appendChild(el);
        return el;
    };

    $root = () => document.getElementById('app');

    _close = ($$modal) => {
        const root = this.$root();
        const {content, $el} = $$modal;
        content.$destroy();
        $$modal.$destroy();
        root.removeChild($el);
    };

    show = ({content = Node, position = `center`}) => {
        const _self = this;
        const modal = _self._create(content,{
            position:position,
            show:false
        });

        requestAnimationFrame(() => {
            modal.show = true;
        });

        modal.aniCallback = function () {
            if (!this.show) {
                _self._close(this);
            }
        };

        modal.onClose = function () {
            this.show = false;
        };

        return {
            close:()=>modal.show=false
        }
    };

    popup ( title , message ,buttons = [] ){
        const _self = this;
        const _popup = this._create(Popup,{
            position:`center`,
            show:false
        },{
            title,
            message,
            buttons,
            handelClick:()=>_popup.show=false,
        });
        _popup.aniCallback = function () {
            if (!this.show) {
                _self._close(this);
            }
        };
        requestAnimationFrame(() => {
            _popup.show = true;
        });
    }

    alert = ( msg  , cb ) => {
        this.popup(`提示`,`${msg}`,[{
            text:`确定`,
            onclick:cb
        }]);
    };

    confrim = ( title=`提示` , msg , ok , cancel ) => {
        this.popup(`${title}`,`${msg||``}`,[{
            text:`取消`,
            onclick:cancel
        },{
            text:`确定`,
            onclick:ok
        }])
    }
}



export default new ModalManager();