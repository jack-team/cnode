/**
 * Created by jiangtao on 2017/6/11.
 */
import Vue from 'vue';

import autoSize from 'autosize';

Vue.directive(`has-header`,{
    inserted (el) {
       el.classList.add(`ms-has-header`);
    }
});

Vue.directive(`has-footer`,{
    inserted (el) {
        el.classList.add(`ms-has-footer`);
    }
});


const setBarItem=(el)=>{
    const barItemNumber = ~~el.getAttribute(`bar-item-number`);
    const nodes = [...el.parentNode.querySelectorAll(`[bar-item]`)];
    const index = nodes.findIndex(node=> node=== el );
    if( barItemNumber!==nodes.length) {
        el.style.width = `${1/nodes.length*100}%`;
        el.style.left= (index/nodes.length*100)+'%';
        el.setAttribute(`bar-item-number`,nodes.length);
    }
};

Vue.directive(`bar-item`,{
    inserted :setBarItem,
    componentUpdated:setBarItem
});

Vue.directive(`textarea-auto`,{
    bind:el=>autoSize(el),
    unbind:el=> {
        const evt = document.createEvent('Event');
        evt.initEvent('autosize:destroy', true, false);
        el.dispatchEvent(evt);
    }
});



