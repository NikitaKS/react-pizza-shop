import axios from "axios";
import {testFilters, testPissas} from "./fake-products";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/pizzas",
    withCredentials: true
});

export const adminProductsAPI = {
    async getProducts () {
        try {
            let res = await instance.get('/');
            if(res.status === 200) {
                return res.data;
            }
        } catch {
            return testPissas;
        }
    },

    async getFilters () {
        try {
            let res = await instance.get(`filter/`);
            if(res.status === 200) {
                return res.data;
            }
        } catch (e) {
            return testFilters;
        }
    },
    postProduct (sendData:any) {
        return instance.post(`order/`, sendData, {headers: {
            'Content-type': 'multipart/form-data',
        }})
            .then(res => {
                return res.data
            })
    },
    putProduct (productId: string) {
        return instance.put(`/${productId}`)
            .then(res => {
                if(res.status >= 200) {
                    return res.data
                }
            })
            .catch(()=>{
                return testFilters;
            })
    },

    deleteProduct (productId: string) {
        return instance.delete(`/${productId}`)
            .then(res => {
                if(res.status >= 200) {
                    return res.data
                }
            })
            .catch(()=>{
                return testFilters;
            })
    },
};