/**
 * Created by jiangtao on 2017/6/11.
 */
import Vue from 'vue';

import autoSize from 'autosize';

Vue.directive(`has-header`, {
    inserted(el) {
        el.style.cssText = `padding-top:44px`;
    }
});

Vue.directive(`has-footer`, {
    inserted(el) {
        el.style.cssText = `padding-bottom: 48px`;
    }
});


const setBarItem = (el) => {
    const elStyle = el.style;
    const barItemNumber = ~~ el.getAttribute(`bar-item-number`);
    const nodes = [...el.parentNode.querySelectorAll(`[bar-item]`)];
    const index = nodes.findIndex(node => node === el);
    if (barItemNumber !== nodes.length) {
        elStyle.width = `${1 / nodes.length * 100}%`;
        elStyle.left = `${index / nodes.length * 100}%`;
        el.setAttribute(`bar-item-number`, nodes.length);
    }
};

Vue.directive(`bar-item`, {
    inserted: setBarItem,
    componentUpdated: setBarItem
});

Vue.directive(`textarea-auto`, {
    bind: el => autoSize(el),
    unbind: el => {
        const evt = document.createEvent('Event');
        evt.initEvent('autosize:destroy', true, false);
        el.dispatchEvent(evt);
    }
});


Vue.directive(`transition-direction`,{
    bind:(el, binding)=>{
        const { value , name } = binding;
        el.setAttribute(name,value);
    },
    componentUpdated:(el,binding)=>{
        const { value , name } = binding;
        const direction = el.getAttribute(name);
        if(direction!==value) {
            el.setAttribute(name,value);
        }
    }
});



