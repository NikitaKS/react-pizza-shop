import axios from "axios";


const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/users",
    withCredentials: true
});

export const authorisationAPI = {
    async logIn() {
        try {
            let res = await instance.get('/login');
            if (res.status >= 200) {
                return res.data;
            }
        } catch {
            return ;
        }
    },
    async logOut() {
        try {
            let res = await instance.delete('/logout');
            if (res.status >= 200) {
                return res.data;
            }
        } catch {
            return ;
        }
    },
};