import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.withCredentials = true;

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

export const pizzasAPI = {
    getPizzas () {
        return axios.get('http://127.0.0.1:8000/api/pizza/?format=json')
            .then(res => {
                if(res.status === 200) {
                    return res.data
                }
            })
    },
    getFilters () {
        return instance.get(`filter/?format=json`)
            .then(res => {
                if(res.status === 200) {
                    return res.data;
                }
            })
    },
    postOrder (formData, order) {
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
                debugger;
                return res
            })
    },
    getOrders () {
        return axios.get('http://127.0.0.1:8000/api/order/?format=json')
            .then(res => {
                if(res.status === 200) {
                    return res.data
                }
            })
    },
};