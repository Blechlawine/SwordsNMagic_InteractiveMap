import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Root from "./Root.vue";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
    MdExpandmoreRound,
    MdLocationpin,
    MdAddRound,
    MdExpandlessRound,
    MdCloseRound,
    MdCheckboxRound,
    MdCheckboxoutlineblankRound,
    MdEditRound,
} from "oh-vue-icons/icons/md";
import { createRouter, createWebHistory } from "vue-router";

addIcons(
    MdExpandmoreRound,
    MdEditRound,
    MdLocationpin,
    MdAddRound,
    MdCheckboxRound,
    MdCheckboxoutlineblankRound,
    MdExpandlessRound,
    MdCloseRound
);

const routes = [{ path: "/", component: App }];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(Root).use(router).component("Icon", OhVueIcon).mount("#app");
