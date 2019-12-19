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