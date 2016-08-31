import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import hintMiddleware from './middlewares/hint';

import rootSaga from './sagas/O-navigation-sagas';
import rootReducer from './reducers/O-navigation-reducers';
import Container from './containers/O.navigation.containers/O-navigation-models.jsx';

injectTapEventPlugin();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, compose(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(hintMiddleware),
  (window.devToolsExtension && window.devToolsExtension()) || (f => f)
));

sagaMiddleware.run(rootSaga);
render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>

      <Container />

    </MuiThemeProvider>
  </Provider>, document.getElementById('container'));
