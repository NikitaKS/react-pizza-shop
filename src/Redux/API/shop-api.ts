import axios from "axios";
import {testFilters, testPissas} from "./fake-products";
import {I_UserInfoToOrder, IPostOrderItem} from "../../../../Core/orders-types";
import {APIerrorLogger} from "../../utils/errorLogger";
//
// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.xsrfCookieName = "csrftoken";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/", withCredentials: true
});

export const productsAPI = {
    async getProducts () {
        try {
            let res = await instance.get('pizzas');
            if(res.status === 200) {
                return res.data.products;
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
    postOrder (formData:I_UserInfoToOrder, order: Array<IPostOrderItem>) {
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
    getOrderData():Promise<Array<I_orderDates>> {
        return instance.get(`work-month/`)
            .then(res => {
                if (res.status === 200) {
                    return res.data
                }
            })
            .catch((err) => {
                throw err;
            })
    },
};
export const languageDataAPI = {
    async getLanguageData() {
        try {
            let res = await instance.get('front-page/');
            return res.data
        } catch (err) {
            APIerrorLogger(err);
            console.log(err);
            throw err
        }
    },
};