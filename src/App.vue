<template>
    <div class="home">
        <Sidebar></Sidebar>
        <Map></Map>
    </div>
    <div class="alerts">
        <Alert v-for="alert in alerts" :key="alert.id" :alert="alert"></Alert>
    </div>
</template>

<script setup lang="ts">
import Map from "./components/Map.vue";
import Alert from "./components/Alert.vue";
import Sidebar from "./components/sidebar/Sidebar.vue";
import { alerts } from "./store/app";
import { initialize } from "./store/data";
import { onMounted } from "vue";

onMounted(() => {
    initialize();
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@400;500;700&display=swap");
@import "./assets/_variables.scss";

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Baloo Tamma 2";
    font-weight: 500;
    color: $textColor;
}

body {
    overflow: hidden;
    background-color: $backgroundColor;
}

.horizontalFlex {
    display: flex;
    flex-direction: row;
    align-items: center;

    &.right {
        justify-content: flex-end;
    }

    &.left {
        justify-content: flex-start;
    }

    &.gap10 {
        grid-gap: 10px;
    }
}

.alerts {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    grid-gap: 10px;
    padding: 10px;
}

// HOME styles

.home {
    display: grid;
    grid-template-columns: 400px 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "sidebar map";

    &.authenticated {
        grid-template-rows: 56px 1fr;
        grid-template-areas:
            "adminBar map"
            "sidebar map";
    }

    height: 100vh;
    width: 100vw;
    overflow: hidden;

    .map {
        grid-area: map;
    }

    .sidebar {
        grid-area: sidebar;
    }

    .adminBar {
        grid-area: adminBar;
    }
}
</style>
