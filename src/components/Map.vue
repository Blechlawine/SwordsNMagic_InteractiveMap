<template>
    <div>
        <div
            class="map"
            ref="componentRef"
            @mousedown="onMouseDown"
            @mouseup="moving = false"
            @mousemove.prevent="onMouseMove"
            @wheel="zoom"
            @click="useTool"
            :style="mapStyle"
        >
            <div class="mapContent" :style="mapPositionStyle" ref="mapRef">
                <img :src="`${currentMapImageSrc}`" alt="" class="image" ref="image" />
                <Pin v-for="pin in pins" :key="pin.id" :pin="pin" :style="pinStyle" @edit="editPin"></Pin>
            </div>
        </div>
        <Button class="addBtn" @click="selectAddTool" :primary="true"> <Icon name="md-add-round"></Icon></Button>
        <PinDialog
            :open="pinDialogOpen"
            :preset-values="pinDialogPresetValues"
            @close="closePinDialog"
            @save="upsertPrivatePin"
        />
    </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import PinDialog from "../components/dialog/PinDialog.vue";
import Button from "./Button.vue";
import Pin from "./Pin.vue";
import { addAlert, currentMapImageSrc, currentArea } from "../store/app";
import { pins, upsertPrivatePin } from "../store/data";
import { PinOutput, PinValidator } from "../types/validators";

const moving = ref(false);
const mapPosition = reactive({
    x: 0,
    y: 0,
});
const mouseDownPosition = reactive({
    x: 0,
    y: 0,
});
const prevMapPosition = reactive({
    x: 0,
    y: 0,
});
const canMove = ref(true);
const mapScale = ref(1);
const mapRef = ref<Element | null>(null);
const componentRef = ref<Element | null>(null);
const pinDialogOpen = ref(false);
const pinDialogPresetValues = ref<PinOutput | null>(null);

// COMPUTED

const mapPositionStyle = computed(() => ({
    transform: `scale(${mapScale.value}) translate(${mapPosition.x}px, ${mapPosition.y}px)`,
}));
const mapStyle = computed(() => ({
    cursor: canMove.value ? (moving.value ? "grabbing" : "grab") : "crosshair",
}));
const pinStyle = computed(() => ({
    transform: `scale(${1 / mapScale.value}) translate(-${18 * mapScale.value}px, -${18 * mapScale.value}px)`,
}));

// METHODS

const onMouseDown = (event: MouseEvent) => {
    if (!canMove.value) return;
    moving.value = true;
    mouseDownPosition.x = event.clientX;
    mouseDownPosition.y = event.clientY;
    prevMapPosition.x = mapPosition.x;
    prevMapPosition.y = mapPosition.y;
};
const onMouseMove = (event: MouseEvent) => {
    if (canMove.value && moving.value) moveMap(event);
};
const moveMap = (event: MouseEvent) => {
    mapPosition.x = prevMapPosition.x + (event.clientX - mouseDownPosition.x) / mapScale.value;
    mapPosition.y = prevMapPosition.y + (event.clientY - mouseDownPosition.y) / mapScale.value;
};
const zoom = (event: WheelEvent) => {
    if (!canMove.value) return;
    if (event.deltaY > 0) mapScale.value *= 0.9;
    else mapScale.value *= 1.1;
};
const selectAddTool = () => {
    canMove.value = false;
    window.addEventListener("keydown", cancelTool);
};
const useTool = (event: MouseEvent) => {
    if (canMove.value || !mapRef.value) return;
    mouseDownPosition.x = event.clientX;
    mouseDownPosition.y = event.clientY;
    const visualMapPosition = mapRef.value.getBoundingClientRect();
    const parsed = PinValidator.safeParse({
        title: "Untitled pin",
        area: currentArea.value,
        typeId: null,
        x: (event.clientX - visualMapPosition.x) / mapScale.value,
        y: (event.clientY - visualMapPosition.y) / mapScale.value,
    });
    if (!parsed.success) {
        addAlert({ title: "Error", text: [parsed.error.message] });
        return;
    }
    pinDialogPresetValues.value = parsed.data;
    pinDialogOpen.value = true;
};
const cancelTool = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
        canMove.value = true;
        window.removeEventListener("keydown", cancelTool);
    }
};
const closePinDialog = () => {
    canMove.value = true;
    window.removeEventListener("keydown", cancelTool);
    pinDialogOpen.value = false;
};
const editPin = (pin: PinOutput) => {
    canMove.value = false;
    pinDialogPresetValues.value = pin;
    pinDialogOpen.value = true;
};
</script>
<style scoped lang="scss">
@import "../assets/_variables.scss";

.addPinDialog {
    cursor: initial;
    z-index: 100;
}

.map {
    width: 100%;
    height: 100%;
    overflow: hidden;
    user-select: none;

    background-color: $paperColor;

    .mapContent {
        height: 100%;
        width: 100%;
    }
}

.image {
    position: absolute;
    pointer-events: none;
    width: 4096px;
}

.addBtn {
    position: fixed;
    bottom: 12px;
    right: 12px;
}
</style>