
import {reduceTest}from "../reducers/reducerDemo";
import { takeEvery } from "redux-saga";
import {put} from "redux-saga/effects";
import {NIHAO,HELLO} from "../constans/constantDemo";


function* mouseEvent() {
    yield  put({type:NIHAO});
}

function* sagaRoot() {
    yield takeEvery(NIHAO,mouseEvent)
}