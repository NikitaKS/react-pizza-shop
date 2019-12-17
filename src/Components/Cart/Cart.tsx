import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {calculateOrder, decreaseQuantity, increaseQuantity, removeFromOrder} from "../../Redux/productsReducer";
import {NavLink} from "react-router-dom";
import {IOrderItem} from "../../types/types";
import {getOrder, getTotalPrice, getTotalQuantity} from "../../Redux/selectors";
import {AppStateType} from "../../Redux/Store";
import style from './Cart.module.css';
import ButtonMain from "../../common/Buttons/ButtonMain";
import CartItem from "../SmallProductItem/SmallProductItem";

interface IConnectProps {
    order: Array<IOrderItem>,
    totalQuantity: number,
    totalPrice: number
}
interface IDispatchProps {
    decreaseQuantity: (id:string)=> void;
    increaseQuantity: (id:string)=> void;
    removeFromOrder: (id:string)=> void;
    calculateOrder: ()=> void;
}

const Cart = ({order, decreaseQuantity, increaseQuantity, removeFromOrder, calculateOrder}:IDispatchProps&IConnectProps) => {

    let orderItems = order.map(i => <CartItem
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



const mapStateToProps = (state: AppStateType) => {
    return {
        order: getOrder(state),
        totalQuantity: getTotalQuantity(state),
        totalPrice: getTotalPrice(state),
    }
};

export default compose(
    connect(mapStateToProps, {increaseQuantity, decreaseQuantity, removeFromOrder, calculateOrder})
)(Cart);
