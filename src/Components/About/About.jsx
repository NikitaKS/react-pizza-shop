import React, {Component} from 'react';
import slide from "./../../assets/images/slide1.png"
import Preloader from "../../common/Preloader";
import {fetchOrders} from "../../Redux/pizzasReducer.ts";
import {connect} from "react-redux";
import {compose} from "redux";
import style from './About.module.css';
import {DatepickerRU} from "../../common/FormControls/DatePicker";

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageLoaded: false,
        }
    }
    componentDidMount() {
        if (!this.props.orders)
            this.props.fetchOrders();
    }
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

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
    }
};

export default compose(connect(mapStateToProps, {fetchOrders}))(About);
