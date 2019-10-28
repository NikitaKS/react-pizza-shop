import React from 'react';
import style from './PizzaItem.module.css';


const PizzaCard = (props) => {
let filtersTitles = props.pizza.filter.map( f => <span>{f.name}</span>);


    return (
        <div className={style.card}>
            <h2>{props.pizza.name}</h2>
            <div className={style.mainImg}><img src={props.pizza.photo}/></div>
            <h3>Price: {props.pizza.price}</h3>
            <h4>size: {props.pizza.size}</h4>
            <div>
                <h5>FILTERS</h5>
                {filtersTitles}
            </div>
            <div>
                <h5>short discription: {props.pizza.text_short}</h5>
            </div>
            <div>
                <span>long discription: {props.pizza.text_long}</span>
            </div>
        </div>
    )
};

export default PizzaCard;