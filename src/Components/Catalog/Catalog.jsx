import React, {Component} from 'react';
import style from './Catalog.module.css';
import PizzaCard from "./../PizzaItem/PizzaItem";
import {compose} from "redux";
import {connect} from "react-redux";
import {addPizzaToOrder, calculateOrder} from "../../Redux/pizzasReducer";
import bgPict from "./../../assets/images/slide1.png"

class Catalog extends Component {

    state = {
        selectedFilter: 'All',
        bgPict: bgPict
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
            className={style.filterBtn}
            onClick={() => {
                this.changeFilter(f.name)
            }}>{f.name}</button>);


        return (

            <div>
                    <div>
                        <div>
                            <div style={{
                                backgroundImage: `url(${this.state.bgPict})`,
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                                height: `35rem`,
                                backgroundSize: 'cover',
                            }}
                            className={style.caruselContent}>
                                <h3>
                                    Carusel Title
                                </h3>
                            </div>
                            <div className={style.container}>{filters}</div>
                        </div>
                        <hr/>
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
