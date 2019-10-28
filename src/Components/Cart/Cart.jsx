import React from 'react';
import style from './Cart.module.css';
import {compose} from "redux";
import {connect} from "react-redux";
import {calculateOrder, decreaseQuantity, increaseQuantity, removeFromOrder} from "../../Redux/pizzasReducer";


const Cart = ({order, decreaseQuantity, increaseQuantity, removeFromOrder, calculateOrder}) => {

    let orderItems = order.map( i => <CartItem
        pizza={i}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        removeFromOrder={removeFromOrder}
    />);


    return (
        <div className={style.cartWrapper}>
            {orderItems}
        </div>
    )
};

const CartItem = ({pizza, decreaseQuantity, increaseQuantity, removeFromOrder, calculateOrder}) => {
    return (
        <div>
            <hr />
    <div className={style.tableRow}>

        <div className={style.mainImg}><img src={pizza.photo}/></div>
        <div>{pizza.name}</div>
        <div>size: {pizza.size}</div>
        <div>FILTERS</div>
        <div>
            <span>short discription: {pizza.text_short}</span>
        </div>
        <div>
            <span>Вес 500гр</span>
        </div>
        <div>
            <div>
                <div>
                    <button onClick={decreaseQuantity}>-</button>
                    <span>{pizza.quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                </div>
                <div>
                    <span>{pizza.price*pizza.quantity}</span>
                    <span>BYN</span>
                </div>
            </div>
            <div>
                <button onClick={removeFromOrder}>X</button>
            </div>
        </div>
    </div>
    </div>
    )
};

const mapStateToProps = (state) => {
    return {
        order: state.reducer.order,
        totalQuantity: state.reducer.totalQuantity,
        totalPrice: state.reducer.totalPrice,
    }
};

export default compose(
    connect(mapStateToProps, { increaseQuantity, decreaseQuantity, removeFromOrder, calculateOrder})
)(Cart);
