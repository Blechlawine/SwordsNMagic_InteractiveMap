import { PinOutput } from "./validators";

export interface IType {
    id: string;
    title: string;
    description: string | null;
    categoryId: string;
    visible: boolean;
    icon?: string;
}

export interface ICategory {
    id: string;
    title: string;
    description: string | null;
}

export type TTypeWithCategory = IType & {
    category: ICategory;
};

export type TCategoryWithTypes = ICategory & {
    types: IType[];
};

export type TPinWithType = PinOutput & {
    type: IType;
};

export type TPinWithTypeAndCategory = IPin & {
    type: TTypeWithCategory;
};

export interface IAlert {
    id?: string;
    title: string;
    text: string[];
}
