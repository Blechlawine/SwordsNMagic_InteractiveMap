import { computed, ref } from "vue";
import { ICategoryIndex, ICategoryTypes, ITypePins } from "../types/Api";
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
    let _types: IType[] = [];
    await Promise.all(categories.value.map(async (category) => {
        const typesForCategoryResponse = await fetch(`/api/types/${category.id}.json`);
        const typesForCategory = (await typesForCategoryResponse.json()) as ICategoryTypes;
        _types = _types.concat(
            ...typesForCategory.types.map((t) => ({
                ...t,
                categoryId: category.id,
                visible: true,
            }))
        );
    }));
    let _pins: PinOutput[] = [];
    await Promise.all(_types.map(async (pinType) => {
        const pinsForTypeResponse = await fetch(`/api/pins/${pinType.id}.json`);
        const pinsForType = (await pinsForTypeResponse.json()) as ITypePins;
        _pins = _pins.concat(
            ...pinsForType.pins.map((pin) => ({
                ...pin,
                typeId: pinType.id,
                status: "public",
            }))
        );
    }));
    types.value = _types;
    pins.value = _pins.concat(loadPrivatePins());
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

const loadPrivatePins = () => {
    const privatePins = localStorage.getItem("pins");
    if (!privatePins) return;
    return JSON.parse(privatePins);
};
