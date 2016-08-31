/**
 * Created by Administrator on 2016/8/30 0030.
 */
import React from 'react';
import { render } from 'react-dom';
import Snackbar from 'material-ui/Snackbar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const HINT = Symbol();

let changeStatus;
const defaultDuration = 2000;

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      open: false,
      duration: defaultDuration,
    };
  }
  componentDidMount() {
    changeStatus = (message, duration) => {
      this.setState({
        message,
        duration,
        open: true,
      });
    };
  }
  render() {
    return <Snackbar
      message={this.state.message}
      open={this.state.open}
      autoHideDuration={this.state.duration}
    />;
  }
}

function initComponent() {
  const ele = document.createElement('div');
  document.body.appendChild(ele);
  render(
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Component />
    </MuiThemeProvider>, ele);
}

initComponent();

export const globalHint = (title, duration = defaultDuration) => ({
  type: HINT,
  title,
  duration,
});

export default () => next => action => {
  if (action.type !== HINT) {
    next(action);
  } else {
    changeStatus(action.title, action.duration);
  }
};
