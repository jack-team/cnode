<template>
    <div>
        <div class="header"></div>
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>

<script>
    const history_key = `CNODE_HISTORY`;
    export default {
        data() {
            return {
                transitionName: 'slide-left'
            }
        },
        beforeRouteUpdate(to, from, next) {
            const names = this.saveName(from.name,to.name);
            const nextIndex = names.findIndex(name=>name === to.name);
            const preIndex = names.findIndex(name=>name === from.name);
            const isBack= nextIndex < preIndex;
            this.transitionName = isBack?`slide-right`:`slide-left`;
            if( isBack ) this.deleteName(from.name);
            next();
        },
        methods: {
            getNames() {
                const nameMap = sessionStorage.getItem(history_key) || `[]`;
                return new Set(JSON.parse(nameMap));
            },
            deleteName( name ){
                const names = this.getNames();
                names.delete(name);
                sessionStorage.setItem(history_key,JSON.stringify([...names]));
            },
            saveName(pre,next) {
                const nameMap = new Set(this.getNames());
                nameMap.add(pre);
                nameMap.add(next);
                const nameArray=[...nameMap];
                sessionStorage.setItem(history_key,JSON.stringify(nameArray));
                return nameArray;
            }
        }
    }
</script>

<style scoped>
    .child-view {
        position: absolute;
        width: 100%;
        transition: all .4s cubic-bezier(.55, 0, .1, 1);
        opacity: 1;
        top: 0;
        left: 0;
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        transform: translate(80%, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        transform: translate(-80%, 0);
    }

    .header {
        position: absolute;
        height: 44px;
        background: linear-gradient(to right, #FF7A4C, #FF5655);
        width: 100%;
        left: 0;
        top: 0;
    }
</style>