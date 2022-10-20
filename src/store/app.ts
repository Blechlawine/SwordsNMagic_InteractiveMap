import { nanoid } from "nanoid";
import { computed, ref } from "vue";
import { IAlert } from "../types/Data";

export const currentArea = computed(() => mapLocations.value[mapLocationIndex.value].name);
export const mapLocations = ref([
    {
        name: "Azura",
        path: "Map_Azura.png",
    },
    {
        name: "Farmlands",
        path: "Map_Farmlands.png",
    },
    {
        name: "Windless Woods",
        path: "Map_WindlessWoods.png",
    }
]);
export const mapLocationIndex = ref(0);
export const currentMapImageSrc = computed(() => mapLocations.value[mapLocationIndex.value].path);
export const alerts = ref<IAlert[]>([]);

export const addAlert = (alert: IAlert) => {
    if (!alert.id) alert.id = nanoid();
    alerts.value.push(alert);
    setTimeout(() => {
        alerts.value = alerts.value.filter((a) => a.id !== alert.id);
    }, 4000);
};
