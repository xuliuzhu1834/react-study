import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Toptoolbar from '../../components/O-navigation.jsx';
import Classification from '../../components/O-navigation-classfiction.jsx';

const Container = (props) => (
  <div >
    <Paper zDepth={2} style={{ padding: '20px' }}>
      <Toptoolbar {...props} />
    </Paper>
    { /* {<Demo {...props}/>} */ }
    <div style={{ marginTop: '20px' }}>
      <Classification {...props} />
      {console.log(props)}
    </div>
  </div>
);


const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Container);
