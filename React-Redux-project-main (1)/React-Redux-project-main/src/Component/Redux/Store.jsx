import { createStore, applyMiddleware } from "redux";
import Reducer from "./token/Reducer"
import logger from "redux-logger";

const store = createStore(Reducer, applyMiddleware(logger));

export default store;