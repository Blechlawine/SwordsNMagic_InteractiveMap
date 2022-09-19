<template>
    <div class="pin" :style="pinStyle">
        <div class="clicky" @click="detailsOpen = !detailsOpen">
            <Icon :name="pinType?.icon ?? 'md-locationpin'" class="pinIcon"></Icon>
        </div>
        <div class="details" v-if="detailsOpen">
            <div class="detailsHeader">
                <p class="pinTitle">
                    {{ pin?.title ?? "" }}
                </p>
                <div class="headerBtns">
                    <Button @click.stop="$emit('edit', pin)" icon v-if="pin?.status === 'private'">
                        <Icon name="md-edit-round"></Icon>
                    </Button>
                    <Button @click="detailsOpen = !detailsOpen" icon>
                        <Icon name="md-close-round"></Icon>
                    </Button>
                </div>
            </div>
            <div class="detailsContent">
                <div class="imageContainer" v-if="pin?.imageUrl">
                    <img :src="pin.imageUrl" alt="" />
                </div>
                <p class="description" v-if="pin?.description">
                    {{ pin.description }}
                </p>
                <div class="placeholder" v-else>
                    <p>This pin does not have a description</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import { PinOutput } from "../types/validators";
import { types } from "../store/data";
import Button from "./Button.vue";
import { currentArea } from "../store/app";

const props = defineProps({
    pin: {
        type: Object as PropType<PinOutput>,
    },
});

const detailsOpen = ref(false);
const pinType = computed(() => types.value.find((t) => t.id === props.pin?.typeId));
const visible = computed(() => pinType.value?.visible && currentArea.value === props.pin?.area);

const pinStyle = computed(() => ({
    "margin-left": `${props.pin?.x}px`,
    "margin-top": `${props.pin?.y}px`,
    display: visible.value ? "initial" : "none",
}));
</script>
<style scoped lang="scss">
@import "../assets/_variables.scss";

.pin {
    position: absolute;
    height: 36px;
    width: 36px;

    .clicky {
        position: absolute;
        cursor: pointer;
        width: 36px;
        height: 36px;
    }

    .details {
        width: max-content;
        max-width: 500px;
        position: absolute;
        z-index: 120;
        background-color: $backgroundColor;
        border-radius: 6px;
        transform: translate(calc(-50% + 18px), -100%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2);

        .detailsHeader {
            display: flex;
            grid-gap: 10px;
            align-items: center;
            justify-content: space-between;
            padding: 12px;
            border-bottom: 2px solid black;
            > * {
                height: 24px;
            }

            .pinTitle {
                text-overflow: ellipsis;
                overflow-x: hidden;
                white-space: nowrap;
            }
        }

        .detailsContent {
            display: flex;
            flex-direction: column;
            grid-gap: 10px;
            padding: 12px;
            max-width: 400px;
            width: max-content;

            .imageContainer {
                width: 100%;
                height: 100%;

                img {
                    border-radius: 6px;
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .headerBtns {
        display: flex;
        grid-gap: 10px;
        flex-direction: row;
    }

    .pinIcon {
        width: 100%;
        height: 100%;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2);
    }
}
</style>