/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */


// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

// import missing ie11 polyfills from core-js
import 'core-js';
import 'regenerator-runtime/runtime';
import '../css/app.scss';
import Vue from 'vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import {AlertPlugin, BootstrapVue, CollapsePlugin, IconsPlugin} from 'bootstrap-vue';
import Storage from 'vue-web-storage';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './components/app';

Vue.use(Storage, {
    prefix: 'app-store-',
    drivers: ['local', 'session'],
});
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(CollapsePlugin);
Vue.use(AlertPlugin);

new Vue(
    {
        components:
            {
                App
            },
        data: {
            parameter: () => {
                return params;
            }
        },
        mounted() {
            this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
                this.$localStorage.set(collapseId, isJustShown);
            });
        },
        render: h => h(App),
        router: router,
        store,
        vuetify
    }
).$mount('#app');
