import { ICategory, IType } from "./Data";

export interface ICategoryIndex {
    categories: ICategory[];
}

export interface ICategoryTypes {
    types: IType[];
}

export interface ITypePins {
    pins: PinOutput[];
}
