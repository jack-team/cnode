import LazyTpl from './LazyLoad';

import { Manager } from './../components/Modal';

const Modal = new Manager();

const showAni = () => {
    const loadAni = Modal.show(LazyTpl,{
        opacity:0,
        maskDuration:0,
        contentDuration:0
    });
    return ()=> loadAni.show = false;
};

const LazyLoad = function ( Component , path ) {
    return ()=> {
        const closeAni = showAni();
        const ScreenLoading = document.getElementById('init-loading');
        return Component().finally(()=>{
            setTimeout(() => {
                closeAni();
                ScreenLoading.style.visibility=`hidden`;
            },200);
        })
    }
};

export default LazyLoad;

