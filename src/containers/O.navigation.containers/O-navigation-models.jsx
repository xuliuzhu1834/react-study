import React from 'react';
import { connect } from 'react-redux';
import { Paper, Divider } from 'material-ui';
import Toptoolbar from '../../components/O-navigation.jsx';
import Classification from '../../components/O-navigation-classfiction.jsx';
import TableExampleComplex from '../../components/navigationTable.jsx';
import NavigationEditToggle from '../../components/navigation-EditToggle.jsx';

const Container = (props) => (
  <div >
    <NavigationEditToggle />
    <div id="navigationTable">
      <Divider style={{ height: '20px' }} />
      <TableExampleComplex />
    </div>
    <div id="navigationEdit" style={{ display: 'none' }}>
      <Divider style={{ height: '20px' }} />
      <Paper zDepth={2} style={{ padding: '20px' }}>
        <Toptoolbar {...props} />
      </Paper>
      { /* {<Demo {...props}/>} */ }
      <div style={{ marginTop: '20px' }}>
        <Classification {...props} />
      </div>
    </div>
  </div>
);


const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Container);
