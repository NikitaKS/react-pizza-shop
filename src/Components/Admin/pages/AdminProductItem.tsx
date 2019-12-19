import style from "../Admin.module.css";
import React from "react";
import {IProductItem} from "../../../../../Core/products-types";


interface IAdminItemProps {
    product: IProductItem,
    remove: (itemId: string) => void;
}

const AdminProductItem = ({product, remove}: IAdminItemProps) => {
    return (
        <div className={style.tableRow}>
            <div className={style.row}>
                <div className={style.mainImg}>
                    <img src={product.photo_thumbnail ? product.photo_thumbnail : product.photo} alt={product.text_short}/>
                </div>
            </div>
            <div className={style.row}>
                <div className={style.description}>
                    <h6>{product.name}</h6>
                    <span>{product.size}</span>
                </div>
                <div className={style.description}>
                    <span>{product.text_short}</span>
                    <span>Вес 500гр</span>
                </div>
            </div>

            <div className={style.rowCalc}>
                <div className={style.col}>
                    <button
                        onClick={() => {
                            alert(product.id)
                        }}
                        className={style.btnSmall}
                    >+
                    </button>
                    <button
                        onClick={() => {
                            alert(product.id)
                        }}
                        className={style.btnSmallMinus}
                    >-
                    </button>
                </div>
                <div className={style.calculator}>
                    <span><b>BYN</b></span>

                </div>
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