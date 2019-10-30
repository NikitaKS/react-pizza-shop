import React, {Component} from 'react';
import '../App.css';
import style from './Main.module.css';
import {NavLink, Redirect, Route} from "react-router-dom";
import Order from "./Order/Order";
import {compose} from "redux";
import {connect} from "react-redux";
import Catalog from "./Catalog/Catalog";
import Preloader from "../common/Preloader";
import Header from "./StaticComponents/Header";
import Footer from "./StaticComponents/Footer";
import About from "./About/About";
import {fetchCatalog} from "../Redux/pizzasReducer";
import Cart from "./Cart/Cart";

class Main extends Component {
    componentDidMount() {
        this.props.fetchCatalog();
    }

    render() {

        return (
            <div>
                <Header totalQuantity={this.props.totalQuantity} totalPrice={this.props.totalPrice}/>

                <div>
                    {this.props.isFetching ?
                        <Preloader/> :
                        <div className={style.mainWrapper}>
                            <Route exact path="/"
                                   render={()=> <Redirect to={"/catalog"}/>}/>
                            <Route path="/catalog" render={() => <Catalog/>}/>
                            <Route path="/order" render={() => <Order/>}/>
                            <Route path="/cart" render={() => <Cart />}/>
                            <Route path="/about" render={() => <About/>}/>
                        </div>
                    }

                </div>

                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.reducer.isFetching,
        totalQuantity: state.reducer.totalQuantity,
        totalPrice: state.reducer.totalPrice,
    }
};
export default compose(
    connect(mapStateToProps, {fetchCatalog})
)(Main);
