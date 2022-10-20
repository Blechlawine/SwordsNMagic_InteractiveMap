import { createApp } from "vue";
import "./style.scss";
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
    GiLog,
    GiOre,
    GiPlantSeed,
    GiLockedChest,
    GiWolfHead,
    GiBoar,
    GiScarecrow,
    GiBandit,
    GiSpiderWeb,
    GiShoppingBag,
    GiBank,
    GiTreeBeehive,
    GiLotus,
    GiMushrooms,
    GiCrystalGrowth,
    GiVanillaFlower,
    GiRaiseSkeleton,
    GiPumpkinLantern,
} from "oh-vue-icons/icons";
import { createRouter, createWebHistory } from "vue-router";

addIcons(
    MdExpandmoreRound,
    MdEditRound,
    MdLocationpin,
    MdAddRound,
    MdCheckboxRound,
    MdCheckboxoutlineblankRound,
    MdExpandlessRound,
    MdCloseRound,
    GiLog,
    GiOre,
    GiPlantSeed,
    GiLockedChest,
    GiWolfHead,
    GiScarecrow,
    GiBoar,
    GiBandit,
    GiSpiderWeb,
    GiShoppingBag,
    GiBank,
    GiTreeBeehive,
    GiLotus,
    GiMushrooms,
    GiCrystalGrowth,
    GiVanillaFlower,
    GiRaiseSkeleton,
    GiPumpkinLantern,
);

const routes = [{ path: "/", component: App }];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(Root).use(router).component("Icon", OhVueIcon).mount("#app");
