import store from "./Store";

store.subscribe(()=>{
    let orderStorage = {
        order: store.getState().reducer.order,
        totalPrice: store.getState().reducer.totalPrice,
        totalQuantity: store.getState().reducer.totalQuantity,
    };
    localStorage.setItem('order', JSON.stringify(orderStorage))
});

export const persistedState = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) :
    {
        order: [],
        totalPrice: 0,
        totalQuantity: 0,};