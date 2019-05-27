import Container from './index.vue';
import Content from './content.vue';
import Header from './header.vue'

export interface Tab {
    id: string,
    name: string
}

export default {
    Container,
    Content,
    Header
}