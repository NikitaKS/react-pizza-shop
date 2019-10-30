import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";

function Header({totalQuantity, totalPrice}) {

    return (

        <header className={style.headerWrapper}>
            <h2>PIROZHOK!!!</h2>
            <NavLink to="/cart" activeClassName={style.active}>
                <p>CART : {totalQuantity}</p>
                <p>price : {totalPrice}</p>
            </NavLink>

            <div className={style.navContainer}>
                <NavLink to="/about" activeClassName={style.active}>
                    <div className={style.item}>
                        About
                    </div>
                </NavLink>
                <NavLink to="/catalog" activeClassName={style.active}>
                    <div className={style.item}>
                        Catalog
                    </div>
                </NavLink>
                <NavLink to="/order" activeClassName={style.active}>
                    <div className={style.item}>
                        Order
                    </div>
                </NavLink>
            </div>

        </header>
    );
}

export default Header;
