import React, {useState, useEffect} from 'react';
import style from './PizzaItem.module.css';


const PizzaCard = ({pizza, addPizzaToOrder, calculateOrder}) => {

    let filtersTitles = pizza.filter.map(f => <span key={f.name+'1'}>{f.name}</span>);
    let [quantity, setQuantity] = useState(1);
    let [addSucces, setAddSucces] = useState(false);

    // useEffect( () => {
    //     setCurrentInput(props.status);
    // }, [props.status]);

    const decreaseQuantity = () => {
        if (quantity !== 1) {
            setQuantity(quantity-1)
        }
    };

    const onAddToCartClick = () => {
        addPizzaToOrder(pizza, quantity);
        calculateOrder();
        setQuantity(1);
        setAddSucces(true);
    };
    return (
        <div className={style.pizzaCardWrapper}>
            <div className={style.mainImg}><img src={pizza.photo_thumbnail}/></div>
            <div className={style.container}>
                <h5>{pizza.name}</h5>
            </div>
            <div className={style.rowDiscr}>
                <span>{pizza.text_short}</span>
            </div>
            <div className={style.row}>
                <div className={style.calculator}>
                    <div className={style.row}>
                        <button className={style.btnSmallMinus} onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button className={style.btnSmall} onClick={()=>{setQuantity(quantity+1)}}>+</button>
                    </div>
                    <div>
                        <span>{pizza.price*quantity}</span>
                        <span style={{marginLeft: '5px'}}>BYN</span>
                    </div>
                </div>
                <div>
                    <button className={style.btnAdd} onClick={onAddToCartClick}>Добавить в корзину</button>
                </div>
            </div>
        </div>
    )
};

export default PizzaCard;