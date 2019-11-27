import React, {Component, useRef} from 'react';
import slide from "./../../assets/images/slide1.png"
import Preloader from "../../common/Preloader";
import {fetchOrders} from "../../Redux/pizzasReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import style from './About.module.css';
import {AppStateType} from "../../Redux/Store";
import axios from "axios";
import {IFilterItem, IPizzaItem} from "../../types/types";

interface IProps {
    filters: Array<IFilterItem>,
    pizzas: Array<IPizzaItem>
}
interface IState {
    imageLoaded: boolean
    pizzas: any
}

const PizzaForm:any = ({onSubmit}:any) => {
    const userNameRef = useRef(null);
    // @ts-ignore
    let mainPhotoSelected = (e) => {
        if (e.target.files.length) {
            let formData = new FormData();
            formData.append('image', e.target.files[0]);
            axios.put(`profile/photo`, formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            })
        }
    };
    const createPizza = () => {
        // @ts-ignore
        let name = userNameRef.current.value !== null ? userNameRef.current.value : 'asd';
        onSubmit(name)
    };

    return (
        <div>
            <div>
                <input onChange={mainPhotoSelected} type={"file"}/>
                <input ref={userNameRef}/>
                <button onClick={createPizza}>newUser</button>
            </div>
        </div>
    )
}

class About extends Component<IProps> {
    state:IState = {
        imageLoaded: false,
        pizzas: []
    };

    componentDidMount(): void {
        axios.get("http://127.0.0.1:8000/pizzas")
            .then((res)=>{
                debugger;
                this.setState({pizzas: res.data})
            })
    }

    onSubmit = (formData:any) => {
        debugger;
        axios.post("http://127.0.0.1:8000/pizzas", {formData});
    };
    handleImageLoaded() {
        this.setState({imageLoaded: true});
    }
    deletePizza = (id:number) => {
        axios.delete(`http://127.0.0.1:8000/pizzas/${id}`);
    };
    render() {
        let pizzas = this.state.pizzas;
        let displayPizzas = pizzas.map((p:any) =>
            <div key={p.id}>
                {p.name}
                <button onClick={() => {
                    this.deletePizza(p.id)
                }}>X
                </button>
            </div>
        );
        return (
            <div className={style.aboutWrapper}>
                <div>
                    {!this.state.imageLoaded && <Preloader/>}
                    <img src={slide} onLoad={this.handleImageLoaded.bind(this)} alt={"Pechorin Bulki"}/>
                </div>

                <div>
                    <PizzaForm onSubmit={this.onSubmit}/>
                </div>
                {displayPizzas}
            </div>
        );
    }
}

const mapStateToProps = (state:AppStateType) => {
    return {
        filters: state.reducer.filters,
        pizzas: state.reducer.pizzas
    }
};

export default compose(connect(mapStateToProps, {fetchOrders}))(About);