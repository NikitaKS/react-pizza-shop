import React, {Component} from 'react';
import '../App.css';
import axios from "axios";
import style from './Main.module.css';
import PizzaCard from "./PizzaItem/PizzaItem";
import {Redirect, Route} from "react-router-dom";
import Order from "./Order/Order";
import {compose} from "redux";
import {connect} from "react-redux";
import {fechPizzas} from "../Redux/pizzasReducer";

class Main extends Component {

state = {
    pirozki: [
        {
            filter: [{name: 'big'}],
            pizza_id: 123,
            name: "123",
            photo: "http://127.0.0.1:8000/media/images/user.jpg",
            price: "22.00",
            size: "2",
            text_long: "ng",
            text_short: "da",
            active: true,
        },
        ],
    order: [],
    filters: [{name: 'one'},{name: 'two'}],
    selectedFilter: 'All'
};


    componentDidMount() {

    }

    piroshokGet = () => {
        axios.get('http://127.0.0.1:8000/api/pizza/?format=json')
            .then(res => {
                this.setState({pirozki: res.data})
            })
    };
    filtersGet = () => {
        axios.get('http://127.0.0.1:8000/api/filter/?format=json')
            .then(res => {
                this.setState({filters: res.data})
            })
    };
    newOrderPost = (formData) => {
        axios.post('http://127.0.0.1:8000/api/order/', formData)
            .then(res => {
                this.setState({resOfOrder: res.data})
            })
    };
    changeFilter = (filterName) => {
        this.setState({selectedFilter: filterName})
    };

    render() {

        let pizzas = this.state.pirozki
            .filter( p => {
                if (this.state.selectedFilter !== 'All') {
                    return p.filter.some(f =>f.name === this.state.selectedFilter);
               } else {
                    return true;
                }
            })
            .map(p => <PizzaCard pizza={p}/>);

        let filters = this.state.filters.map(f => <button
            onClick={()=>{this.changeFilter(f.name)}}>{f.name}</button>);

        let formDataExample = {
            name: 'asda',
            phone: 123,
            day: new Date(12/11/2011),
            time: 1,
            order: [
                {
                    name: "123",
                    pizza_id: 123,
                    photo: "http://127.0.0.1:8000/media/images/user.jpg",
                    price: "22.00",
                    size: "2",
                    text_short: "da",
                    quantity: 2
                },
            ]
        };
        return (
            <div>


                <header>
                    <div>asd</div>
                    <button onClick={this.props.fechPizzas}>pirozhok</button>
                    <button onClick={this.filtersGet}>filters</button>
                    <button onClick={()=>{this.newOrderPost(formDataExample)}}>post</button>
                    <Route path="/order" render={() => <Order />}/>

                </header>
                <div>
                    <span>FILTERS</span>
                    <div>{filters}</div>
                </div>
                <div className={style.pizzasContainer}>
                    <h2>PIZZAS</h2>
                    {pizzas}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
};
export default compose(
    connect(mapStateToProps, {fechPizzas})
)(Main);
