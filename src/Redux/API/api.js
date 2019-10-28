import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    withCredentials: true,
//    headers: {"API-KEY": "0f32e29f-2408-4879-8199-f94cc9bd7861"},
});

export const pizzasAPI = {
    getPizzas () {
        debugger;
        axios.get('http://127.0.0.1:8000/api/pizza/?format=json')
            .then(res => {
                debugger;
               return  res.data
            })
    },
    getFilters () {
        return instance.get(`filter/?format=json`)
            .then(res => {
                if (res.data.items){
                    return res.data.items;
                }
            })
    },
    putOrder (formData) {
        return instance.post(`order/`, formData)
    }
};