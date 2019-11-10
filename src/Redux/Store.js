import {applyMiddleware, combineReducers, createStore} from "redux";
import listsReducer from "./pizzasReducer";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const combinedReducers = combineReducers({
    reducer: listsReducer,
    form: formReducer,
});

const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;