import React, {Component, useRef, useState} from 'react';
import slide from "./../../assets/images/slide1.png"
import Preloader from "../../common/Preloader";
import AddPizzaReduxForm, {UploadFile} from "../../common/FormControls/Forms/AddPizzaForm";
import {fetchOrders} from "../../Redux/productsReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import style from './Test.module.css';
import {AppStateType} from "../../Redux/Store";
import axios from "axios";
import {IFilterItem, IProductItem} from "../../../../Core/products-types";

interface IProps {
    filters: Array<IFilterItem>,
    pizzas: Array<IProductItem>
}

class Test extends Component<IProps> {
    state:any = {
        imageLoaded: false,
        pizzas: [{id: 'asd', name: 'ssww'}],
        cookie: null,
        image: null
    };

    fetchPizzas = async() => {
        let asd = await axios.get("http://localhost:8000/api/pizzas", {withCredentials: true});
        this.setState({pizzas: asd.data.products});
    };
    logout = async() => {
        let asd = await axios.delete("http://localhost:8000/api/users/logout", {withCredentials: true})
        console.log(asd);
    };
    setImage = (e:any) => {
        if (e.target.files.length) {
            this.setState({image: e.target.files[0]});
        }
    };
    onSubmit = async (formData: any) => {
        if (!this.state.image) {alert("no Image")}
        let sendData = new FormData();

        //converting redux-forms data to FormData
        Object.keys(formData).forEach(key => sendData.append(key, formData[key]));
        sendData.append('image', this.state.image);

        //Sending Post Request
        axios.post("http://127.0.0.1:8000/api/pizzas", sendData, {
            withCredentials: true,
            headers: {
                'Content-type': 'multipart/form-data',
            //    "Authorization": `Bearer ${this.state.cookie}`
            }
        });
    };

    handleImageLoaded() {
        this.setState({imageLoaded: true});
    }
    deletePizza = (id:number) => {
        axios.delete(`http://127.0.0.1:8000/api/pizzas/${id}`, {withCredentials: true});
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
                    //@ts-ignore
                    <AddPizzaReduxForm onSubmit={this.onSubmit}/>
                    <input onChange={this.setImage} type={"file"}/>
                </div>

                <button onClick={this.fetchPizzas}>fetch-pizzas</button>
                <button onClick={this.logout}>LOGOUT</button>
                {displayPizzas}
            </div>
        );
    }
}

const mapStateToProps = (state:AppStateType) => {
    return {
        filters: state.reducer.filters,
        pizzas: state.reducer.products
    }
};

export default compose(connect(mapStateToProps, {fetchOrders}))(Test);