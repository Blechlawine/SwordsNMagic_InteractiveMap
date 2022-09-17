<template>
    <div class="tabs">
        <div
            :class="classes(i)"
            class="tab"
            v-for="(item, i) in mapLocations"
            :key="item.name"
            @click="() => select(i)"
        >
            {{ item.name }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { mapLocationIndex, mapLocations } from "../../store/app";

const Router = useRouter();

onMounted(() => {
    if (Router.currentRoute.value.query.mli) mapLocationIndex.value = Number(Router.currentRoute.value.query.mli);
});

const classes = (i: number) => ({
    active: i === mapLocationIndex.value,
});

const select = (i: number) => {
    mapLocationIndex.value = i;
};

watch(mapLocationIndex, () => {
    Router.push({
        path: "/",
        query: {
            mli: mapLocationIndex.value,
        },
    });
});
</script>
<style scoped lang="scss">
@import "../../assets/_variables.scss";

.tabs {
    background-color: $paperColor;
    display: flex;
    align-items: center;
    padding: 4px;
    border-radius: 6px;

    .tab {
        border-radius: 6px;
        padding: 2px 10px;
        cursor: pointer;

        width: max-content;
        height: min-content;

        user-select: none;

        display: flex;
        align-items: center;
        flex-direction: row;
        border: 4px solid transparent;

        &.active {
            background-color: $red;
            border: 4px solid $darkRed;
            border-radius: 6px;
        }
    }
}
</style>