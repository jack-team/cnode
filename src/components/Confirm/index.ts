import Dialog from './../Dialog';
import Content from './main.vue';

export default (message?: string): void => {
    new Dialog(Content, {
        title: `标题`,
        text: `内容`,
        buttons: [
            {
                text: `取消`,
                onClick: () => {}
            },
            {
                text: `确定`,
                onClick: () => {}
            }
        ]
    })
}

