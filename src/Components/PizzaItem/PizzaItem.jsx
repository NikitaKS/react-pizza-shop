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
        <div className={style.card}>
            <div className={style.mainImg}><img src={pizza.photo_thumbnail}/></div>
            <h2>{pizza.name}</h2>
            <span>size: {pizza.size}</span>
            <span>FILTERS</span>
            <div>
                {filtersTitles}
            </div>
            <div>
                <span>short discription: {pizza.text_short}</span>
            </div>
            <hr />
            <div>
                <span>Вес 500гр</span>
            </div>
            <div className={style.row}>
                <div>
                    <div>
                        <button onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={()=>{setQuantity(quantity+1)}}>+</button>
                    </div>
                    <div>
                        <span>{pizza.price*quantity}</span>
                        <span>BYN</span>
                    </div>
                </div>
                <div>
                    <button onClick={onAddToCartClick}>Добавить в корзину</button>
                </div>
            </div>
        </div>
    )
};

export default PizzaCard;