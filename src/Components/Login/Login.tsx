import React, {Component, useRef} from "react";

const LoginUserForm:any = ({onSubmit}:any) => {
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);

    const logIn = () => {
        // @ts-ignore
        let obj = {phone: phoneRef.current.value, password: passwordRef.current.value};
        onSubmit(obj);
    };

    return (
        <div>
            <div>
                <input ref={phoneRef}/>
                <input ref={passwordRef}/>
                <button onClick={logIn}>login</button>
            </div>
        </div>
    )
};

interface I_LoginPage {
    logIn: (data:any)=> void
}
const LoginPage = ({logIn}:I_LoginPage) => {
    const onUserSubmit = (data:any) => {logIn(data)};

    return (
        <div>
            <LoginUserForm onSubmit={onUserSubmit}/>
        </div>
    )
};

export default LoginPage;