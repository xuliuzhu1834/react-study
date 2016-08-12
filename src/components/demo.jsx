import React, {PropTypes}from "react";
import {helloWorld,FUXX} from "../actions/actionDemo"


export default ({type, dispatch})=>(
    <div onMouseOver={()=>dispatch(helloWorld())}
        onMouseLeave={()=>dispatch(FUXX())}
    >
        <hr/><hr/><br/>
        the value is {type}
        <br/><hr/><hr/>
    </div>
);

