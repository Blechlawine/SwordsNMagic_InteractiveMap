<template>
    <div class="toggleSwitch" @click="value = !value">
        <Icon name="md-checkbox-round" v-if="value" />
        <Icon name="md-checkboxoutlineblank-round" v-else></Icon>
        <!-- <span class="material-icons">{{ on ? "check_box" : "check_box_outline_blank" }}</span> -->
        <p>{{ label }}</p>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
});

const value = computed({
    get: () => props.modelValue,
    set: (v) => emit("update:modelValue", v),
});
</script>
<style scoped lang="scss">
@import "../assets/_variables.scss";

.toggleSwitch {
    display: flex;
    flex-direction: row;
    grid-gap: 6px;
    cursor: pointer;
    user-select: none;

    .material-icons {
        color: $red;
    }

    label {
        color: inherit;
    }
}
</style>
