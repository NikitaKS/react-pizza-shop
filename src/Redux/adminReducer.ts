import {ThunkDispatch} from "redux-thunk";
import {adminProductsAPI} from "./API/admin-products-api";
import {IProductItem} from "../../../Core/products-types";

const DELETE_PRODUCT = 'admin/DELETE_PRODUCT';
const CREATE_PRODUCT = 'admin/CREATE_PRODUCT';


interface I_UserInfo {
    userId: null | string,
    userName: null | string,
}
interface I_UserState extends I_UserInfo{
    isAuth: boolean,
}

const initialState: I_UserState = {
    isAuth: false,
    userId: null,
    userName: null,
};

type usersReducerActions = I_deleteProductSuccess | I_createProductSuccess

interface I_deleteProductSuccess {
    type: typeof DELETE_PRODUCT,
    productId: string
}
interface I_createProductSuccess {
    type: typeof CREATE_PRODUCT,
    product: IProductItem
}


const adminReducer = (state: I_UserState = initialState, action: usersReducerActions) => {
    switch (action.type) {
        //setting fetching status
        case DELETE_PRODUCT:
            return {
                ...state,
                isAuth: action.productId,
            };
        case CREATE_PRODUCT:
            return {
                ...state,
                isAuth: false,
                userId: null,
                userName: null,
            };
        default:
            return state;
    }
};

export const _deleteProductSuccess = (productId: string): I_deleteProductSuccess => {
    return {
        type: DELETE_PRODUCT, productId
    }
};
export const _createProductSuccess = (product: IProductItem): I_createProductSuccess => {
    return {
        type: CREATE_PRODUCT, product
    }
};

export const createProduct = (sendData:any) => async (dispatch: ThunkDispatch<{}, {}, usersReducerActions>) => {
    let created = await adminProductsAPI.postProduct(sendData);
    dispatch(_createProductSuccess(created));
};
export const deleteProduct = (productId: string) => async (dispatch: ThunkDispatch<{}, {}, usersReducerActions>) => {
    let deleted = await adminProductsAPI.deleteProduct(productId);
    dispatch(_deleteProductSuccess(productId));
};

export default adminReducer;