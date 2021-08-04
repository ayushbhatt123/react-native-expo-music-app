import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducer/index";

//create redux store
const Store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default Store;