import style from "../Admin.module.css";
import React from "react";
import AdminProductItem from "./AdminProductItem";
import {IProductItem} from "../../../../../Core/products-types";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/Store";
import { getProducts} from "../../../Redux/selectors";
import {_setProducts, deleteProduct, updateProduct} from "../../../Redux/adminReducer";

interface I_Props {
    products: Array<IProductItem>
}
interface I_DispatchProps {
    _setProducts: (products: Array<IProductItem>)=> void
    deleteProduct: (productId: string)=> void
    updateProduct: (product: IProductItem)=> void
}

const AdminProducts = ({products, deleteProduct, updateProduct}:I_Props & I_DispatchProps) => {
    let existProducts = products.map((item)=>{
        return <AdminProductItem product={item} remove={deleteProduct} updateProduct={updateProduct} />
    });
    return (
        <div className={style.col}>
            {existProducts}
        </div>
    )
};

const mapStateToProps = (state: AppStateType) => {
    return {
        products: getProducts(state),
    }
};

export default compose(
    connect(mapStateToProps, {_setProducts, deleteProduct, updateProduct})
)(AdminProducts);