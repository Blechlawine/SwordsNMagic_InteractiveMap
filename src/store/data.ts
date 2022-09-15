import { computed, ref } from "vue";
import { ICategoryIndex, ICategoryTypes } from "../types/Api";
import type { ICategory, IType } from "../types/Data";
import type { PinOutput } from "../types/validators";

export const pins = ref<PinOutput[]>([]);
export const types = ref<IType[]>([]);
export const categories = ref<ICategory[]>([]);

export const getCategoryTypes = computed(
    () => (category: ICategory) => types.value.filter((t) => t.categoryId === category.id)
);
export const getTypePins = computed(() => (type: IType) => pins.value.filter((p) => p.typeId === type.id));

export const initialize = async () => {
    const categoryResponse = await fetch(`/api/categories/index.json`);
    const categoryIndex = (await categoryResponse.json()) as ICategoryIndex;
    categories.value = categoryIndex.categories;
    types.value = [];
    categories.value.forEach(async (category) => {
        const typesForCategoryResponse = await fetch(`/api/types/${category.id}.json`);
        const typesForCategory = (await typesForCategoryResponse.json()) as ICategoryTypes;
        types.value = types.value.concat(
            typesForCategory.types.map((t) => ({
                ...t,
                categoryId: category.id,
                visible: true,
            }))
        );
    });
    // TODO: load pins from server and set their status to public
    pins.value = pins.value.concat(JSON.parse(localStorage.getItem("pins")));
};

export const upsertPrivatePin = (pin: PinOutput) => {
    let _pin = pins.value.find((p) => p.id === pin.id);
    if (_pin) Object.assign(_pin, pin);
    else addPrivatePin(pin);
    savePrivatePins();
};

export const addPrivatePin = (pin: PinOutput) => {
    pins.value.push({
        ...pin,
    });
};

export const toggleType = (pinType: IType) => {
    types.value.find((t) => t.id === pinType.id)!.visible = !pinType.visible;
};

const savePrivatePins = () => {
    localStorage.setItem("pins", JSON.stringify(pins.value.filter((p) => p.status === "private")));
};
