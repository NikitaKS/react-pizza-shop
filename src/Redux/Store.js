import {applyMiddleware, combineReducers, createStore} from "redux";
import listsReducer from "./pizzasReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const combinedReducers = combineReducers({reducer: listsReducer});

const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export default store;