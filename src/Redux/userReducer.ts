import {ThunkDispatch} from "redux-thunk";
import {authorisationAPI} from "./API/user-api";

const LOGIN_SUCCESS = 'users/LOGIN_SUCCESS';
const LOGOUT_SUCCESS = 'users/LOGOUT_SUCCESS';


interface I_UserInfo {
    userId: null | string,
    userName: null | string,
}
interface I_UserState extends I_UserInfo{
    isAuth: boolean,
}

const initialState: I_UserState = {
    isAuth: false,
    userId: null,
    userName: null,
};

type usersReducerActions = I_authorisationSuccess | I_logOutSuccess

interface I_authorisationSuccess {
    type: typeof LOGIN_SUCCESS,
    status: boolean,
    userInfo: I_UserInfo
}
interface I_logOutSuccess {
    type: typeof LOGOUT_SUCCESS,
}


const authorisationReducer = (state: I_UserState = initialState, action: usersReducerActions) => {
    switch (action.type) {
        //setting fetching status
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: action.status,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuth: false,
                userId: null,
                userName: null,
            };
        default:
            return state;
    }
};

export const _authorisationSuccess = (status: boolean, userInfo: I_UserInfo): I_authorisationSuccess => {
    return {
        type: LOGIN_SUCCESS, status, userInfo
    }
};
export const _logOutSuccess = (): I_logOutSuccess => {
    return {
        type: LOGOUT_SUCCESS
    }
};

export const logOut = () => async (dispatch: ThunkDispatch<{}, {}, usersReducerActions>) => {
    await authorisationAPI.logOut();
    dispatch(_logOutSuccess());
};
export const logIn = () => async (dispatch: ThunkDispatch<{}, {}, usersReducerActions>) => {
    let userInfo = await authorisationAPI.logIn();
    dispatch(_authorisationSuccess(true, userInfo));
};

export default authorisationReducer;