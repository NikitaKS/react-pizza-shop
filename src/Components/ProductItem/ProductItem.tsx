import React, {useState} from 'react';
import style from './ProductItem.module.css';
import ProductImage from "./ProductImage";
import ButtonMain from "../../common/Buttons/ButtonMain";
import {IProductItem} from "../../../../Core/products-types";

interface IProps {
    product: IProductItem,
    addProductToOrder: (product: IProductItem, quantity: number) => void
    calculateOrder: () => void
    openPopup: () => void
}

const ProductCard = ({product, addProductToOrder, calculateOrder, openPopup}: IProps) => {

    let [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1)
        }
    };

    const onAddToCart = () => {
        addProductToOrder(product, quantity);
        calculateOrder();
        setQuantity(1);

    };


    return (
        <div className={style.productCardWrapper}>
            <ProductImage
                imgUrl={product.photo}
                altText={product.text_short}
                openPopup={openPopup}
                imgThumbnail={product.photo_thumbnail ? product.photo_thumbnail : product.photo}
            />
            <div className={style.container}>
                <h5>{product.name}</h5>
            </div>
            <div className={style.rowDiscr}>
                <span>{product.text_short}</span>
            </div>
            <div className={style.row}>
                <div className={style.calculator}>
                    <div className={style.row}>
                        <button className={style.btnSmallMinus} onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button className={style.btnSmall} onClick={() => {
                            setQuantity(quantity + 1)
                        }}>+
                        </button>
                    </div>
                    <div>
                        <span>{(product.price * quantity).toFixed(2)}</span>
                        <span style={{marginLeft: '5px'}}>BYN</span>
                    </div>
                </div>
                <div>
                    <ButtonMain onClickCallback={onAddToCart} buttonText={"Добавить в корзину"}/>
                </div>
            </div>
        </div>
    )
};

export default ProductCard;