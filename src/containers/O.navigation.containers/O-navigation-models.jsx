import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import Toptoolbar from '../../components/O-navigation.jsx';
import Classification from '../../components/O-navigation-classfiction.jsx';
import TableExampleComplex from '../../components/navigationTable.jsx';
import NavigationEditToggle from '../../components/navigation-EditToggle.jsx';
import { compeleData } from '../../actions/O-navigation-action';


const Container = (props) => (
  <div >
    <NavigationEditToggle />
    <div id="navigationTable">
      <Divider style={{ height: '20px' }} />
      <TableExampleComplex {...props} />
    </div>
    <div id="navigationEdit" style={{ display: 'none' }}>
      <Divider style={{ height: '20px' }} />
      <Paper zDepth={2} style={{ padding: '20px' }}>
        <Toptoolbar {...props} />
      </Paper>
      <div style={{ marginTop: '20px' }}>
        <Classification {...props} />
      </div>
    </div>
    <Snackbar
      open={props.getMsg.snackbar}
      message={props.getMsg.snackbarMsg}
      autoHideDuration={2000}
      onRequestClose={() => props.dispatch(compeleData('snackbar', false))}
    />
  </div>
);
Container.propTypes = {
  dispatch: React.PropTypes.func,
  getMsg: React.PropTypes.object,
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Container);
