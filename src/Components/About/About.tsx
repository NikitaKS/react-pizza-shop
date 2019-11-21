import React, {Component} from 'react';
import slide from "./../../assets/images/slide1.png"
import Preloader from "../../common/Preloader";
import {fetchOrders} from "../../Redux/pizzasReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import style from './About.module.css';
import {AppStateType} from "../../Redux/Store";
import axios from "axios";
import AddPizzaReduxForm from "./../../common/FormControls/AddPizzaForm";
import {IFilterItem} from "../../types/types";

interface IProps {
    filters: Array<IFilterItem>,
}
interface IState {
    imageLoaded: boolean
}

class About extends Component<IProps> {
    state:IState = {
        imageLoaded: false,
    };
    onSubmit = (formData:any) => {
        debugger;
        axios.post("http://127.0.0.1:8000/pizzas", {formData});
    };
    handleImageLoaded() {
        this.setState({imageLoaded: true});
    }
    render() {
        return (
            <div className={style.aboutWrapper}>
                <div>
                    {!this.state.imageLoaded && <Preloader/>}
                    <img src={slide} onLoad={this.handleImageLoaded.bind(this)} alt={"Pechorin Bulki"}/>
                </div>

                <AddPizzaReduxForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

const mapStateToProps = (state:AppStateType) => {
    return {
        filters: state.reducer.filters
    }
};

export default compose(connect(mapStateToProps, {fetchOrders}))(About);