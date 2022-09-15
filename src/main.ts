import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

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

addIcons(MdExpandmoreRound,MdEditRound, MdLocationpin, MdAddRound, MdCheckboxRound, MdCheckboxoutlineblankRound, MdExpandlessRound, MdCloseRound);

createApp(App).component("Icon", OhVueIcon).mount("#app");
