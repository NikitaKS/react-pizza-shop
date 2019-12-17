import style from "../Cart/Cart.module.css";
import React from "react";
import {IOrderItem} from "../../types/types";

interface ICartItemProps {
    product: IOrderItem,
    decreaseQuantity: (id:string)=> void;
    increaseQuantity: (id:string)=> void;
    removeFromOrder: (id:string)=> void;
}

const CartItem = ({product, decreaseQuantity, increaseQuantity, removeFromOrder}:ICartItemProps) => {
    return (

        <div className={style.tableRow}>
            <div className={style.row}>
                <div className={style.mainImg}>
                    <img src={product.photo_thumbnail} alt={product.text_short}/>
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
                            increaseQuantity(product.id)
                        }}
                        className={style.btnSmall}
                    >+
                    </button>
                    <span><b>{product.quantity}</b></span>
                    <button
                        onClick={() => {
                            decreaseQuantity(product.id)
                        }}
                        className={style.btnSmallMinus}
                    >-
                    </button>
                </div>
                <div className={style.calculator}>
                    <span>{(product.price * product.quantity).toFixed(2)}</span>
                    <span><b>BYN</b></span>

                </div>
            </div>
            <button
                onClick={() => {
                    removeFromOrder(product.id)
                }}
                className={style.btnSmallClose}
            >X
            </button>
        </div>

    )
};

export default CartItem