<template>
    <div class="dialogWrapper" v-if="open">
        <div class="clickAwayListener" @click="$emit('close')" :style="blackOutStyle"></div>
        <div class="dialog" :style="dialogStyle">
            <div class="titleBar">
                <p class="title">{{ title }}</p>
                <Button small icon @click="$emit('close')">
                    <Icon name="md-close-round"></Icon>
                </Button>
            </div>
            <div class="dialogContent">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import Button from "../Button.vue";

const props = defineProps({
    open: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    zIndex: {
        type: Number,
        default: 20,
    },
});

const blackOutStyle = computed(() => ({
    "z-index": props.zIndex - 1,
}));
const dialogStyle = computed(() => ({
    "z-index": props.zIndex,
}));
</script>
<style scoped lang="scss">
@import "../../assets/_variables.scss";

.dialogWrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .clickAwayListener {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100vw;
        height: 100vh;
        z-index: 100;
    }
}

.dialog {
    min-width: 300px;
    display: flex;
    flex-direction: column;

    .titleBar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        height: 48px;
        background-color: $red;
        border: 4px solid $darkRed;
        border-radius: 6px;
        z-index: 220;

        * {
            height: 24px;
        }

        .closeBtn {
            cursor: pointer;
        }
    }

    .dialogContent {
        background-color: $paperColor;
        border: 4px solid $paperBorderColor;
        border-radius: 6px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        grid-gap: 12px;
        margin: 6px;
        margin-top: -6px;
        z-index: 210;
    }
}
</style>