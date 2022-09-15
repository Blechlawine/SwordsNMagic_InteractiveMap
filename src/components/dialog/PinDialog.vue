<template>
    <Dialog class="pinDialog" :title="title" :open="open" @close="close" :z-index="zIndex">
        <p>x: {{ presetValues?.x }} y: {{ presetValues?.y }}</p>
        <TextInput v-model="title" label="Name"></TextInput>
        <TextInput v-model="imageUrl" label="Image-url"></TextInput>
        <TextInput v-model="description" label="Description"></TextInput>
        <Dropdown :values="types" label="Type" v-model="pinType">
            <template #current="{ value }">
                <p>{{ `${value?.title ?? "Select one"}` }}</p>
            </template>
            <template #value="{ value }">
                <p>{{ `${value.title}` }}</p>
            </template>
        </Dropdown>
        <p class="error" v-if="typeId === null">Please select a type.</p>
        <Button @click="save" primary>Save</Button>
    </Dialog>
</template>
<script setup lang="ts">
import { computed, PropType, ref, watch } from "vue";
import { types } from "../../store/data";
import { PinOutput, PinValidator } from "../../types/validators";
import Dialog from "./Dialog.vue";
import Button from "../Button.vue";
import TextInput from "../inputs/TextInput.vue";
import Dropdown from "../inputs/Dropdown.vue";

const emit = defineEmits<{
    (e: "save", data: PinOutput): void;
    (e: "close"): void;
}>();

const props = defineProps({
    open: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        default: "Edit pin",
    },
    zIndex: {
        type: Number,
        default: 200,
    },
    presetValues: {
        type: Object as PropType<PinOutput | null>,
    },
});

watch(
    () => props.presetValues,
    () => {
        if (props.presetValues) {
            title.value = props.presetValues.title;
            description.value = props.presetValues.description ?? "";
            imageUrl.value = props.presetValues.imageUrl ?? "";
            typeId.value = props.presetValues.typeId;
        } else {
            title.value = "Untitled pin";
            description.value = "";
            imageUrl.value = "";
            typeId.value = null;
        }
    }
);

const title = ref("");
const description = ref("");
const imageUrl = ref("");
const typeId = ref<string | null>(null);

const pinType = computed({
    get: () => types.value.find((t) => t.id === typeId.value) ?? null,
    set: (v) => (typeId.value = v!.id),
});

const save = () => {
    const validated = PinValidator.safeParse({
        ...props.presetValues,
        title: title.value,
        description: description.value,
        imageUrl: imageUrl.value,
        typeId: typeId.value,
    });
    if (!validated.success) return;
    emit("save", validated.data);
    close();
};
const close = () => {
    title.value = "";
    description.value = "";
    imageUrl.value = "";
    typeId.value = null;
    emit("close");
};
</script>
<style scoped>
    
</style>
