import axios from "axios";
import {IPostOrderItem} from "../../types/types";
import {testFilters, testPissas} from "./fake-products";
//
// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.xsrfCookieName = "csrftoken";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

export const productsAPI = {
    async getProducts () {
        try {
            let res = await instance.get('pizza/?format=json');
            if(res.status === 200) {
                return res.data;
            }
        } catch {
            return testPissas;
        }
    },
    async getFilters () {
        try {
            let res = await instance.get(`filter/?format=json`);
            if(res.status === 200) {
                return res.data;
            }
        } catch (e) {
            return testFilters;
        }
    },
    postOrder (formData:any, order: Array<IPostOrderItem>) {
        return instance.post(`order/`, {
            "phone": formData.phone,
            "first_name": formData.first_name,
            "delivery_date": formData.delivery_date,
            "delivery_time": formData.delivery_time,
            "address": formData.address,
            "comment": !formData.comment? '': formData.comment,
            "payment": formData.payment,
            "order_items": order
        }, {withCredentials: true})
            .then(res => {
                return res
            })
    },
    getOrders () {
        return instance.get('order/?format=json')
            .then(res => {
                if(res.status === 200) {
                    return res.data
                }
            })
            .catch(()=>{
                return testFilters;
            })
    },
};