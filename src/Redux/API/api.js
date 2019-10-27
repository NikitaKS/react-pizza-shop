import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    withCredentials: true,
//    headers: {"API-KEY": "0f32e29f-2408-4879-8199-f94cc9bd7861"},
});

export const pizzasAPI = {
    getPizzas () {
        return instance.get("pizza/?format=json")
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                }
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
};