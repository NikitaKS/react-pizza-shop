import React, {Component} from 'react';
import '../App.css';
import axios from "axios";
import style from './Main.module.css';

class Main extends Component {

    state = {
        pirozki: [
            {
                filter: [{name: 'big'},{name: 'small'}],
                name: "123",
                photo: "http://127.0.0.1:8000/media/images/user.jpg",
                price: "22.00",
                size: "2",
                text_long: "ng",
                text_short: "da",
            },
        ],
        filters: [{name: 'asd'},{name: 'asdw'}],
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
            .map(p => <Pizza pizza={p}/>);

        let filters = this.state.filters.map(f => <button
            onClick={()=>{this.changeFilter(f.name)}}>{f.name}</button>);

        return (
            <div>


                <header>
                    <div>asd</div>
                    <button onClick={this.piroshokGet}>pirozhok</button>
                    <button onClick={this.filtersGet}>filters</button>
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

export default Main;

const Pizza = (props) => {
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