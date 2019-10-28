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
    putOrder (formData) {
        return instance.post(`order/`, formData)
    }
};