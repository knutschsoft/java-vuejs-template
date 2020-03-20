"use strict";

import Vue from "vue";
import VueRouter from "vue-router";

import home from '../components/home';
import login from "../components/login";
import Studiengaenge from "../components/studiengaenge";

Vue.use(VueRouter);

let routes = [
    {id: 1, path: "/home", component: home, name: "home"},
    {id: 3, path: "/login", component: login, name: "login"},
    {id: 5, path: "/studiengänge", component: Studiengaenge, name: "studiengaenge"},
    {id: 0, path: "*", redirect: "/home", name: "default"}
];

let router = new VueRouter({
    mode: "history",
    routes: routes
});

export default router;
export {routes};
