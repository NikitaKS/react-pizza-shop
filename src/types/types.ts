import {IFilterItem, IProductItem} from "../../../Core/products-types";

export interface IOrderItem extends IProductItem {
    quantity: number
}

export interface IOrderLocalStorage {
    order: Array<IOrderItem>,
    totalPrice?: number,
    totalQuantity: number,
}


export interface IAppState {
    products: Array<IProductItem>,
    order: Array<IOrderItem>,
    totalPrice: number,
    totalQuantity: number,
    isFetching: boolean,
    filters: Array<IFilterItem>,
    selectedFilter: string,
    orderSuccess: boolean,
}

export interface I_languagePage {
    id: string | number,
    page_name: string,
    front_text: Array<{text_name: string, text: string}>
    "front_image": Array<{image_name: string, image: string}>
}
type Pages = "cross" | "index" ;
type PagesMap<P> = { [page in Pages]: P };
export type I_LanguageData = PagesMap<I_languagePage>;

export interface I_appLanguageState {
    languageData: I_LanguageData,
    isFetchingLanguageData: boolean,
    errorLanguageData: string | null,
}