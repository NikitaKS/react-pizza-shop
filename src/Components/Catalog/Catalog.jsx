import React, {Component} from 'react';
import style from './Catalog.module.css';
import PizzaCard from "./../PizzaItem/PizzaItem";
import {compose} from "redux";
import {connect} from "react-redux";
import {addPizzaToOrder, calculateOrder} from "../../Redux/pizzasReducer";

class Catalog extends Component {

    state = {
        selectedFilter: 'All',
    };

    changeFilter = (filterName) => {
        this.setState({selectedFilter: filterName})
    };

    render() {

        let pizzas = this.props.pizzas
            .filter(p => {
                if (this.state.selectedFilter !== 'All') {
                    return p.filter.some(f => f.name === this.state.selectedFilter);
                } else {
                    return true;
                }
            })
            .map(p => <PizzaCard pizza={p}
                                 key={p.id}
                                 calculateOrder={ this.props.calculateOrder}
                                 addPizzaToOrder={this.props.addPizzaToOrder}/>);


        let filters = this.props.filters.map(f => <button
            key={f.name}
            onClick={() => {
                this.changeFilter(f.name)
            }}>{f.name}</button>);


        return (

            <div>
                    <div>
                        <div>
                            <h5>FILTERS</h5>
                            <div>{filters}</div>
                        </div>
                        <h5>PIZZAS</h5>
                        <div className={style.pizzasContainer}>
                            {pizzas}
                        </div>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pizzas: state.reducer.pizzas,
        filters: state.reducer.filters,
    }
};
export default compose(
    connect(mapStateToProps, { addPizzaToOrder, calculateOrder})
)(Catalog);
