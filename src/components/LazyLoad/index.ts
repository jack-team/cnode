import LazyView from './main.vue';
export default (LazyFn: Function) => {
    return {
        render(hoc: Function) {
            return hoc(LazyView, {
                props: {LazyFn}
            });
        }
    };
};
