import React, {Component} from 'react';
import style from './About.module.css';
import slide from "./../../assets/images/slide1.png"
import Preloader from "../../common/Preloader";
import {fetchOrders} from "../../Redux/pizzasReducer";
import {connect} from "react-redux";
import {compose} from "redux";

class About extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: '',
        }
    }
    componentDidMount() {
        if (!this.props.orders)
        this.props.fetchOrders();
    }

    handleImageLoaded() {
        this.setState({ image: 'loaded' });
    }
    render() {


        return (
                <div className={style.headerWrapper}>


                    <div>
                        {!this.state.image &&
                        <Preloader />
                        }
                        <img src={slide} onLoad={this.handleImageLoaded.bind(this)}/>
                    </div>
                </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        orders: state.orders,
    }
};

export default compose(connect(mapStateToProps,{fetchOrders}))(About);
