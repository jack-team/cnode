import Vue from 'vue';
import Modal from './Modal';
import Node from './default'
import store from './../../store';

class Manager {
    extend = (o, n) => Object.assign(o, n);

    create = (component, modalOpts = {}, contentOpts = {}) => {
        const ModalComponent = Vue.extend(Modal);
        const contentComponent = Vue.extend(component);
        const modal = new ModalComponent({
            propsData: modalOpts,
            store
        });
        const content = new contentComponent({
            propsData:this.extend(
                {$$modal: modal},
                contentOpts
            ),
            store
        });
        modal.$mount(this.$createElement());
        content.$mount(this.$find(modal.$el, `[modal-content]`));
        modal.content = content;
        return modal;
    };

    $find = (parent, target) => {
        return parent.querySelector(target);
    };

    $createElement = () => {
        const el = document.createElement('div');
        this.$root().appendChild(el);
        return el;
    };

    $root = () => document.getElementById('app');

    close = ($$modal) => {
        const root = this.$root();
        const {content, $el} = $$modal;
        content.$destroy();
        $$modal.$destroy();
        root.removeChild($el);
    };

    show = (content = Node, props, contentProps) => {
        const _self = this;
        const modal = _self.create(content, {
            show: false,
            ...props,
        }, {...contentProps});
        requestAnimationFrame(() => {
            modal.show = true;
        });
        modal.aniCallback = function () {
            if (!this.show) {
                _self.close(this);
            }
        };
        modal.onClose = function () {
            this.show = false;
        };
        return modal;
    };

}

export default Manager;