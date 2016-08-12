import React from "react";
import {render} from "react-dom";
import {connect} from "react-redux";

import Demo from "../components/demo.jsx";

const Container = (props) => (
    <div>
        <Demo {...props}/>
    </div>
);

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Container);
