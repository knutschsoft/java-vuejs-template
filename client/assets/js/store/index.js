"use strict";
import Vue from 'vue';
import Vuex from 'vuex';
import Studiengang from './modules/studiengang';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        studiengang: Studiengang,
    },
    strict: debug,
    plugins: []
})

