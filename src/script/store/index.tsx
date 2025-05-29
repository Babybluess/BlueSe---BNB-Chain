import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";

const myStore = createStore(
    rootReducer,
)

export default myStore