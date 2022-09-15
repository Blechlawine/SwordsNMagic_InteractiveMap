<template>
    <div :class="inputClasses" class="textinput">
        <label :style="labelStyles">{{ label }}</label>
        <input type="text" v-model="value" @focus="active = true" @blur="active = false" ref="inputRef" />
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        required: true,
    },
});

const active = ref(false);

const empty = computed(() => props.modelValue === "" && !active.value);
const inputClasses = computed(() => ({
    active: active.value,
}));
const labelStyles = computed(() => ({
    "font-size": !empty.value ? "11px" : "16px",
    transform: !empty.value ? "translate(3px, -16px)" : "",
}));
const value = computed({
    get: () => props.modelValue,
    set: (v) => emit("update:modelValue", v),
});
</script>
<style scoped lang="scss">
@import "../../assets/_variables.scss";

.textinput {
    background-color: $red;
    transition: all 200ms ease;
    border: 4px solid $red;
    border-radius: 6px;
    display: flex;
    align-items: center;

    input {
        outline: none;
        color: $textColor;
        width: 100%;
        font-size: 16px;
        line-height: 24px;
        border: none;
        padding: 6px 8px 0px 8px;
        background-color: $red;
    }

    &.active {
        border: 4px solid $darkRed;
    }

    label {
        transition: all 200ms ease;
        position: absolute;
        margin-left: 4px;
        padding: 0 6px;
        border-radius: 6px;
        pointer-events: none;
        user-select: none;
        background-color: inherit;
    }
}
</style>