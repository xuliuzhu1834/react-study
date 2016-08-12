import React from 'react';
import { render } from 'react-dom';
//import { createStore } from 'redux';
import { connect, Provider } from 'react-redux'
import View from "./containers/container.jsx";
import {store} from "./store/configureStore"
//
// const reducer = (state = { val: 0 }, action) => {
//   switch (action.type) {
//       case 'test':
//           return assign({}, state, {
//              val: state.val + 1,
//           });
//       default:
//           return state;
//   }
// };
//
// const store = createStore(reducer);
//
// const View = ({ val, dispatch }) => (
//     <div onClick={() => dispatch({ type: 'test' })}>
//         The Value is {val}
//     </div>
// );


render(<Provider store={store} >
        <View />
    </Provider>, document.getElementById('container'));
