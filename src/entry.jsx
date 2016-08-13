import React from 'react';
import { render } from 'react-dom';
//import { createStore } from 'redux';
import {  Provider } from 'react-redux'
import View from "./containers/container.jsx";
import {store} from "./store/configureStore"

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render(
    <Provider store={store} >
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>

            <View />

        </MuiThemeProvider>
    </Provider>, document.getElementById('container'));