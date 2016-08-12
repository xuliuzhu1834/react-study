import {createStore} from "redux";
import {reduceTest} from "../reducers/reducerDemo";

export const store = createStore(reduceTest);