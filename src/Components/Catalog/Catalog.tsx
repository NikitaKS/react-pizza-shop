import React, {Component} from 'react';
import style from './Catalog.module.css';
import ProductCard from "../ProductItem/ProductItem";
import {compose} from "redux";
import {connect} from "react-redux";
import {addProductToOrder, calculateOrder, setSortFilter} from "../../Redux/productsReducer";
import bgPict from "./../../assets/images/slide1.png"
import PopupWrapper from "../../common/PopupWrapper";
import {AppStateType} from "../../Redux/Store";
import {getFilters, getLanguageData, getProducts, getSelectedFilter} from "../../Redux/selectors";
import {IFilterItem, IProductItem} from "../../../../Core/products-types";
import Slider from "../../common/Slider";
import {I_LanguageData} from "../../types/types";

let commonCarusel = {"front_image": [
        {
            "image_name": "carousel asdasdasd image 1",
            "image": bgPict
        },
        {
            "image_name": "Общество с ограниченной ответственностью «Печь Орин» image 2",
            "image": bgPict
        },
        {
            "image_name": "Общество с ограниченной ответственностью «Печь Орин» image 2",
            "image": bgPict
        }
    ]};

interface IConnectProps {
    products: Array<IProductItem>,
    filters: Array<IFilterItem>,
    selectedFilter: string,
    languageData: I_LanguageData
}

interface LinkDispatchProps {
    addProductToOrder: (productItem: IProductItem, quantity: number) => void;
    calculateOrder: () => void;
    setSortFilter: (filter:string) => void;
}

interface IState {
    bgPict: string
    isPopupOpen: boolean
    popupProduct: IProductItem
}

class Catalog extends Component<IConnectProps & LinkDispatchProps> {

    state: IState = {
        bgPict: bgPict,
        isPopupOpen: false,
        popupProduct: this.props.products[0],
    };

    setPopupOpen = (product: IProductItem, option: boolean) => {
        this.setState({popupProduct: product});
        this.setState({isPopupOpen: option});
    };
    changeFilter = (filterName: string) => {
        this.props.setSortFilter(filterName)
    };

    render() {
        let products = this.props.products
            .map(p => (
                <ProductCard product={p}
                           openPopup={() => {
                               this.setPopupOpen(p, true)
                           }}
                           key={p.id}
                           calculateOrder={this.props.calculateOrder}
                           addProductToOrder={this.props.addProductToOrder}
                />
            ));

        let filters = this.props.filters
            .map(f => (
                <button
                    key={f.name}
                    className={style.filterBtn}
                    onClick={() => {
                        this.changeFilter(f.name)
                    }}
                >
                    {f.name}
                </button>
            ));
        let { languageData } = this.props;

        return (
            <div>
                {this.state.isPopupOpen &&
                <PopupWrapper
                    product={this.state.popupProduct}
                    setPopupClose={() => {
                        this.setPopupOpen(this.state.popupProduct, false)
                    }}
                />}

                <div>
                    <div>
                        <Slider
                            commonImages={languageData.index.front_image}
                            commonTexts={languageData.index.front_text}
                        />
                        <div className={style.container}>{filters}</div>
                    </div>
                    <hr/>
                    <div className={style.productsContainer}>
                        {products}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): IConnectProps => {
    return {
        products: getProducts(state),
        filters: getFilters(state),
        selectedFilter: getSelectedFilter(state),
        languageData: getLanguageData(state),
    }
};
export default compose(
    connect(mapStateToProps, {addProductToOrder, calculateOrder, setSortFilter})
)(Catalog);
