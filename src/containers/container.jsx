import React from "react";
import {connect} from "react-redux";

import Paper from 'material-ui/Paper';
import {Toptoolbar} from  "../components/O-navigation.jsx"

const Container = (props) => (
<Paper zDepth={2} >
    <Toptoolbar {...props}/>
        {/*{<Demo {...props}/>}*/}
    </Paper>
);



const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Container);
