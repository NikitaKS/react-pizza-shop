import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {calculateOrder, decreaseQuantity, increaseQuantity, removeFromOrder} from "../../Redux/productsReducer";
import {NavLink} from "react-router-dom";
import {IOrderItem, IProductItem} from "../../types/types";
import {getOrder, getProducts, getTotalPrice, getTotalQuantity} from "../../Redux/selectors";
import {AppStateType} from "../../Redux/Store";
import style from './Admin.module.css';
import ButtonMain from "../../common/Buttons/ButtonMain";

interface IConnectProps {
    isAuth: boolean,
    order: Array<IOrderItem>,
    products: Array<IProductItem>,
}

interface IDispatchProps {
    decreaseQuantity: (id:string)=> void;
    increaseQuantity: (id:string)=> void;
    removeFromOrder: (id:string)=> void;
    calculateOrder: ()=> void;
}

interface IAdminItemProps {
    product: IOrderItem,
    decreaseQuantity: (id:string)=> void;
    increaseQuantity: (id:string)=> void;
    removeFromOrder: (id:string)=> void;
}

const Admin = ({order, decreaseQuantity, increaseQuantity, removeFromOrder, calculateOrder}:IDispatchProps&IConnectProps) => {

    let orderItems = order.map(i => <AdminItem
        key={i.id}
        product={i}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        removeFromOrder={removeFromOrder}
    />);

    return (
        <div>
            <div className={style.tableRow}>
                <h3>Items in your CART</h3>
            </div>
            <div className={style.cartWrapper}>
                {orderItems}
            </div>
            <div className={style.rowBetween}>
                <NavLink to="/catalog">
                    <ButtonMain buttonText={"To Menu"}/>
                </NavLink>
                <NavLink to="/order">
                    <ButtonMain buttonText={"Order"}/>
                </NavLink>
            </div>
        </div>
    )
};


const AdminItem = ({product, decreaseQuantity, increaseQuantity, removeFromOrder}:IAdminItemProps) => {
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

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        products: getProducts(state),
        order: getOrder(state),
    }
};

export default compose(
    connect(mapStateToProps, {increaseQuantity, decreaseQuantity, removeFromOrder, calculateOrder})
)(Admin);
