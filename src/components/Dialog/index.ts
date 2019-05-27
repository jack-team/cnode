import Vue from 'vue';
import Container from './main.vue';

interface Options {
    position?: string,
    opacity?: number,
    clickClose?: boolean
}

const _createElement = (tag: string): Element => {
    return document.createElement(tag)
}

class Dialog {
    _dialog: any | Vue;
    _content: any | Vue;
    _Props: any | object;
    _Component: Function;
    _Element: any | Element;
    _created: boolean = false;
    _showedFn: Function = () => console.log(`Opened...`);
    _closedFn: Function = () => console.log(`Closed...`);

    constructor(
        Component: Function,
        Props?: object
    ) {
        this._Props = Props;
        this._Component = Component;
        this._Element = _createElement(`div`);
        this._init();
    }

    _init(): void {
        const contentVue = (
            Vue.extend(this._Component)
        );
        const _Props:object = {
            dialog: this,
            ...this._Props
        }
        this._content = (
            new contentVue({
                propsData: _Props
            })
        );
    }

    _createFactory = (options?: Options) => {
        this._createDialog(options)
        this._createContent();
        this._created = true;
    }

    _createDialog = (options?: Options) => {
        const dialogVue = (
            Vue.extend(Container)
        )
        const _Props:object = {
            ...options,
            onClosed: this._onClosed,
            onShowed: this._onShowed
        }
        this._dialog = (
            new dialogVue({
                propsData: _Props
            })
        )
        this._dialog.$mount(
            this._Element
        )
    }

    _createContent = () => {
        const {
            replace
        } = this._dialog.$refs;
        this._content.$mount(replace);
    }

    _onShowed = () => {
        this._showedFn()
    }

    _onClosed = () => {
        this._closedFn()
    }

    get status(): boolean {
        const {
            iShow = false
        } = this._dialog || {}
        return iShow;
    }

    get _wrapper(): Element {
        const {
            $el
        } = (this._dialog || {}) as Vue;
        return $el || this._Element;
    }

    _handel = (show: boolean) => {
        if (!this._dialog || !this._created) {
            return false
        }
        if (show) {
            this._dialog.show();
        }
        else {
            this._dialog.close();
        }
    }

    _appendElement = () => {
        document.body.appendChild(this._Element);
    }

    show = (options?: Options): Promise<{}> => {
        if (!this._created) {
            this._appendElement()
            this._createFactory(options);
        }
        else {
            this._handel(true);
        }
        return (
            new Promise(resolve => (
                this._showedFn = resolve
            ))
        )
    }

    close = (): Promise<{}> => {
        this._handel(false);
        return (
            new Promise(resolve => (
                this._closedFn = resolve
            ))
        )
    }

    destroy = (): void => {
        if (this._dialog) {
            this._dialog.$destroy();
        }
        if (this._content) {
            this._content.$destroy();
        }
        document.body.removeChild(this._wrapper);
        this._created = false;
        this._Element = null;
    }
}

export default Dialog;