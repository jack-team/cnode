import Vue from 'vue';
import './reset.scss';
import FastClick from 'fastclick';

import {
    Loading,
    ScrollView
} from './../components';

FastClick.attach(document.body);

Vue.component(`Loading`,Loading);
Vue.component(`ScrollView`,ScrollView);