<template>
    <button :class="classes" class="btn">
        <p class="label">
            <slot></slot>
        </p>
    </button>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    primary: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: Boolean,
        default: false,
    },
    tiny: {
        type: Boolean,
        default: false,
    },
    small: {
        type: Boolean,
        default: false,
    },
});

const classes = computed(() => ({
    "btn-primary": props.primary,
    "btn-secondary": !props.primary,
    "btn-icon": props.icon,
    "btn-tiny": props.tiny,
    "btn-small": props.small,
}));
</script>
<style scoped lang="scss">
@import "../assets/_variables.scss";

.btn {
    transition: all 200ms ease;

    border-radius: 6px;
    padding: 2px 10px;
    cursor: pointer;

    width: max-content;
    height: min-content;

    user-select: none;

    display: flex;
    align-items: center;
    flex-direction: row;

    border: none;
    background-color: transparent;

    .label {
        font-weight: 500;
        font-size: 16px;
        height: 24px;
        pointer-events: none;
    }

    &.btn-primary {
        background-color: $red;
        border: 4px solid $darkRed;

        &:hover {
            background-color: $darkRed;
        }
    }

    &.btn-icon {
        padding: 2px;
    }

    &.btn-secondary {
        &:hover {
            background-color: $hoverColor;
        }
    }

    &.btn-small {
        font-size: 14px;
    }

    &.btn-tiny {
        font-size: 12px;
    }
}
</style>
