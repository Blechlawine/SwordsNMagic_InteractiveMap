<template>
    <div class="alert">
        <p>{{ alert.title }}</p>
        <p v-for="text in alert.text" :key="text">{{ text }}</p>
    </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { IAlert } from "../types/Data";

const props = defineProps({
    alert: {
        type: Object as PropType<IAlert>,
        required: true,
    },
});
</script>
<style scoped lang="scss">
// TODO: style alert
.alert {
    width: 100%;
}
</style>
