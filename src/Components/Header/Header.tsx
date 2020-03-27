import React, {useState} from 'react';
import style from './Header.module.css';
import {Link, NavLink} from "react-router-dom";
import CartBtn from "./CartBtn";
import logoImg from "./../../assets/icons/logo.svg"
import {Drawer} from 'antd';

interface IProps {
    totalQuantity: number,
    totalPrice: number
}

function Header(props: IProps) {
    const [visible, setVisible] = useState(false);
    return (
        <header className={style.headerWrapper}>
            <Link to="/catalog">
                <div className={style.label}>
                    <img src={logoImg} alt={"Pekarnya Pechorin"}/>
                </div>
            </Link>
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
            <div className={style.inform}>
                <span>Мы работаем с пн.-пт. с 8 до 19.00</span>
                <span>+375 (33) 658-02-20</span>
            </div>
            <CartBtn {...props}/>
            <span onClick={() => setVisible(true)}>OPEN</span>
            <Drawer
                title="Basic Drawer"
                placement={"top"}
                closable={false}
                onClose={()=>setVisible(false)}
                visible={visible}
            >
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
                <div className={style.inform}>
                    <span>Мы работаем с пн.-пт. с 8 до 19.00</span>
                    <span>+375 (33) 658-02-20</span>
                </div>
            </Drawer>
        </header>
    );
}

export default Header;
