import React, {useRef} from "react";
import axios from "axios";

const LoginUserForm:any = ({onSubmit}:any) => {
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);

    const logIn = async (obj:any) => {
        let response = await axios.post("http://127.0.0.1:8000/users/login", obj, {
            withCredentials: true,
        });
    };
    const createPizza = () => {
        // @ts-ignore
        let obj = {phone: phoneRef.current.value, password: passwordRef.current.value};
        logIn(obj);
    };

    return (
        <div>
            <div>
                <input ref={phoneRef}/>
                <input ref={passwordRef}/>
                <button onClick={createPizza}>login</button>
            </div>
        </div>
    )
};

const LoginPage: React.FC = () => {
    const onUserSubmit = () => {};

    return (
        <div>
            <LoginUserForm onSubmit={onUserSubmit}/>
        </div>
    )
};

export default LoginPage;