<template>
    <div class="sidebar">
        <div class="locations">
            <Tabs></Tabs>
        </div>
        <p>Categories</p>
        <FoldableSection class="category" v-for="category in categories" :key="category.id" :title="category.title">
            <template #content>
                <div class="toggleWrapper" v-for="pinType in getCategoryTypes(category)" :key="pinType.id">
                    <ToggleSwitch
                        :model-value="pinType.visible"
                        @update:model-value="toggleType(pinType)"
                        :label="`${pinType.title} (${getTypePins(pinType).length})`"
                    ></ToggleSwitch>
                </div>
            </template>
        </FoldableSection>
    </div>
</template>
<script setup lang="ts">
import { categories, getCategoryTypes, getTypePins, toggleType } from "../../store/data";
import Tabs from "./Tabs.vue";
import ToggleSwitch from "../ToggleSwitch.vue";
import FoldableSection from "./FoldableSection.vue";
</script>
<style scoped lang="scss">
@import "../../assets/_variables.scss";

.sidebar {
    background-color: $backgroundColor;
    width: 100%;
    height: 100%;
    z-index: 1000;
    padding: 12px;

    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    .locations {
        display: flex;
        flex-direction: row;
        grid-gap: 8px;
    }

    .toggleWrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .toggleBtn {
            color: white;
            display: none;
            cursor: pointer;
        }

        &:hover > .toggleBtn {
            display: initial;
        }
    }

    .sectionHeader {
        > * > .editBtn {
            display: none;
        }

        &:hover {
            > * > .editBtn {
                display: initial;
            }
        }
    }
}
</style>
