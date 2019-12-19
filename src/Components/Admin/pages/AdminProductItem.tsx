import style from "../Admin.module.css";
import React from "react";
import {IProductItem} from "../../../../../Core/products-types";
import EditForm from "./EditForm";


interface IAdminItemProps {
    product: IProductItem,
    remove: (itemId: string) => void;
}

const AdminProductItem = ({product, remove}: IAdminItemProps) => {
    return (
        <div className={style.tableRow}>
            <div className={style.row}>
                <div className={style.mainImg}>
                    <img src={product.photo_thumbnail ? product.photo_thumbnail : product.photo}
                         alt={product.text_short}/>
                </div>
            </div>
            <div className={style.row}>
                <EditForm title={'Name'} commonValue={product.name} type={"input"} applyChange={()=>{}}/>
                <EditForm title={'price'} commonValue={product.price} type={"number"} applyChange={()=>{}}/>
                <EditForm title={'size'} commonValue={product.size} type={"number"} applyChange={()=>{}}/>
                <EditForm title={'Short Text'} commonValue={product.text_short} type={"input"} applyChange={()=>{}}/>
                <EditForm title={'Long Text'} commonValue={product.text_long} type={"input"} applyChange={()=>{}}/>
            </div>

            <button
                onClick={() => {
                    alert(product.id)
                }}
                className={style.btnSmallClose}
            >X
            </button>
        </div>

    )
};

export default AdminProductItem