import React, {Component} from 'react';
import {Redirect, Route, withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {fetchCatalog} from "../Redux/productsReducer";
import {withSuspense} from "../hoc/withSuspense";
import {AppStateType} from "../Redux/Store";
import {getIsFetching, getTotalPrice, getTotalQuantity} from "../Redux/selectors";
import CartButtonStickyWrapper from "./CartButtonStickyWrapper";
//Styles
import '../App.css';
import style from './Main.module.css';
//Components
import Preloader from "../common/Preloader";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Catalog from "./Catalog/Catalog";
import Order from "./Order/Order";
import Cart from "./Cart/Cart";
import About from "./About/About";
import Test from "./TestPage/Test";

const Admin = React.lazy(() => import('./Admin/Admin'));

interface IProps {
    title: string
}

interface IConnectProps {
    isFetching: boolean,
    totalQuantity: number,
    totalPrice: number,
}

interface LinkDispatchProps {
    fetchCatalog: () => void;
}

class Main extends Component<IProps & IConnectProps & LinkDispatchProps> {
    componentDidMount() {
        this.props.fetchCatalog();
        //listning for errors
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors());
    }

    catchAllUnhandledErrors = (promiseRejectionEvent?: any): any => {
        console.log('some error occured');
    };

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors())
    }

    render() {
        return (
            <div>
                <Header totalQuantity={this.props.totalQuantity} totalPrice={this.props.totalPrice}/>
                <div className={style.mainWrapper}>
                    {this.props.isFetching ?
                        <Preloader/> :
                        <div>
                            <CartButtonStickyWrapper />
                            <Route exact path="/"
                                   render={() => <Redirect to={"/catalog"}/>}/>
                            <Route path="/catalog" component={Catalog}/>
                            <Route path="/order" component={Order}/>
                            <Route path="/cart" component={Cart}/>
                            <Route path="/about" component={About}/>
                            <Route path="/test" component={Test}/>
                            <Route path="/admin" render={withSuspense(Admin)}/>
                        </div>
                    }
                </div>
                <Footer/>

            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): IConnectProps => {
    return {
        isFetching: getIsFetching(state),
        totalQuantity: getTotalQuantity(state),
        totalPrice: getTotalPrice(state),
    }
};
export default compose(
    withRouter,
    connect(mapStateToProps, {fetchCatalog})
)(Main);