import {NIHAO,HELLO} from "../constans/constantDemo"
import assign from 'object-assign';

export function reduceTest(state={},action){
    switch (action.type){
        case NIHAO:
            return assign({},state,{
                type:"HELLO WORLD"
            });
        case HELLO:
            return assign({},state,{
                type:"FU XX U"
            });
        default:
            return state;
    }
}