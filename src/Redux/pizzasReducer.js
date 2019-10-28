import {pizzasAPI} from "./API/api";

const SET_PIZZAS = 'MAIN_PAGE/ADD_LIST';
const SET_FILTERS = 'MAIN_PAGE/SET_FILTERS';
const INCREASE_QUANTITY = 'PIZZAS/INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'PIZZAS/DECREASE_QUANTITY';
const ADD_PIZZA_TO_ORDER = 'ORDER/ADD_PIZZA_TO_ORDER';

const initialState = {
    pizzas: [
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

const pizzasReducer = (state = initialState, action) => {
    switch (action.type) {
        //adding feched pizzas to state
        case SET_PIZZAS:
            return {
                ...state,
                pizzas: action.pizzas.filter( pz => pz.active)
            };
        //adding feched filters to state
        case SET_FILTERS:
            return {
                ...state,
                filters: action.filters
            };
        //increase quantity of single pizza in state
        case INCREASE_QUANTITY:
            return {
                ...state,
                order: state.order.map(pz => {
                    if(pz.pizza_id !== action.pizza_id){
                        return pz;
                    } else {
                        return {...pz, quantity: pz.quantity+1}
                    }
                })
            };
        //decrease quantity of single pizza in state
        case DECREASE_QUANTITY:
            return {
                ...state,
                order: state.order.map(pz => {
                    if(pz.pizza_id === action.pizza_id){
                        return {...pz, quantity: pz.quantity === 0 ? pz.quantity : pz.quantity -1}
                    } else {
                        return pz
                    }
                })
            };
        case ADD_PIZZA_TO_ORDER:
            let orderItem = {
                pizza_id: action.pizzaItem.pizza_id,
                name: action.pizzaItem.name,
                photo: action.pizzaItem.photo,
                price: action.pizzaItem.price,
                size: action.pizzaItem.size,
                text_short: action.pizzaItem.text_short,
                quantity: action.quantity
            };
            return {
                ...state,
                order: [
                    ...state.order,
                    orderItem
                ]
            };
        default:
            return state;
    }
};

//LOCAL ACTIONS
export const setPizzasSuccess = (pizzas) => {
    return {
        type: SET_PIZZAS, pizzas
    }
};
export const setFiltersSuccess = (filters) => {
    return {
        type: SET_FILTERS, filters
    }
};


//EXTERNAL ACTIONS
export const increaseQuantity = (pizza_id) => {
    return {
        type: INCREASE_QUANTITY, pizza_id
    }
};
export const decreaseQuantity = (pizza_id) => {
    return {
        type: DECREASE_QUANTITY, pizza_id
    }
};

export const addPizzaToOrder = (pizzaItem, quantity) => {
    return {
        type: ADD_PIZZA_TO_ORDER, pizzaItem, quantity
    }
};


//FETCH ACTIONS
export const fechPizzas = () => (dispatch) => {
    debugger;
    pizzasAPI.getPizzas()
        .then( data => {
            dispatch(setPizzasSuccess(data));
        });
};
export const fechFilters = () => (dispatch) => {
    pizzasAPI.getFilters()
        .then( data => {
            dispatch(setFiltersSuccess(data));
        });
};
export const submitOrder = (orderData) => async (dispatch) => {
    const res = await pizzasAPI.putOrder()

}

export default pizzasReducer;