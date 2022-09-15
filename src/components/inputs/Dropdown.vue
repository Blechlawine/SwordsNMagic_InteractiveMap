<template>
    <div :class="classes" class="dropdown">
        <div class="select" @click="open = !open">
            <p class="value">
                <slot :value="modelValue" name="current"></slot>
            </p>
            <div class="actions">
                <Icon name="md-expandless-round" v-if="open" />
                <Icon name="md-expandmore-round" v-else></Icon>
            </div>
        </div>
        <div class="values" v-if="open">
            <div class="value" v-for="val in values" :key="val.id" @click="() => selectValue(val)">
                <slot :value="val" name="value"></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import { IType } from "../../types/Data";
import Button from "../Button.vue";

const emit = defineEmits<{
    (e: "update:modelValue", value: IType): void;
}>();

const props = defineProps({
    modelValue: {
        type: Object as PropType<IType | null>,
    },
    values: {
        type: Array as PropType<IType[]>,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
});

const open = ref(false);

const classes = computed(() => ({
    open: open.value,
}));

const selectValue = (value: IType) => {
    emit("update:modelValue", value);
    open.value = false;
};
</script>
<style scoped lang="scss">
@import "../../assets/_variables.scss";

.dropdown {
    transition: all 200ms ease;
    display: flex;
    flex-direction: column;
    position: relative;

    &.open {
        .select {
            z-index: 30;
        }
        .values {
            z-index: 20;
        }
    }

    .select {
        background-color: $red;
        border: 4px solid $darkRed;
        border-radius: 6px;
        padding: 6px 8px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: all 200ms ease;

        &:hover {
            background-color: $darkRed;
        }

        .actions {
            display: flex;
            flex-direction: row;
        }

        .value {
            height: 24px;
        }
    }

    .values {
        position: absolute;
        width: calc(100% - 12px);
        margin: 6px;
        margin-top: 36px;
        background-color: $red;
        border-radius: 6px;
        border: 4px solid $darkRed;

        .value {
            padding: 12px;
            cursor: pointer;
            p {
                height: 24px;
            }

            &:hover {
                background-color: $darkRed;
            }
        }
    }
}
</style>
