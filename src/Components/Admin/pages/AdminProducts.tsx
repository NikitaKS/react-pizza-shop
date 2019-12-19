import style from "../Admin.module.css";
import React from "react";
import AdminProductItem from "./AdminProductItem";
import {IProductItem} from "../../../../../Core/products-types";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/Store";
import { getProducts} from "../../../Redux/selectors";

interface I_Props {
    products: Array<IProductItem>
}

const AdminProducts = ({products}:I_Props) => {
    let existProducts = products.map((item)=>{
        return <AdminProductItem product={item} remove={(itemId:string)=>{console.log(itemId)}} />
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
    connect(mapStateToProps, {})
)(AdminProducts);