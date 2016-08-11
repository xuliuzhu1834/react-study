import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux'
import assign from 'object-assign';

const reducer = (state = { val: 0 }, action) => {
  switch (action.type) {
      case 'test':
          return assign({}, state, {
             val: state.val + 1,
          });
      default:
          return state;
  }
};

const store = createStore(reducer);

const View = ({ val, dispatch }) => (
    <div onClick={() => dispatch({ type: 'test' })}>
        The Value is {val}
    </div>
);
const mapStateToProps = (state) => state;
const Connected = connect(mapStateToProps)(View);

render(<Provider store={store} >
        <Connected/>
    </Provider>, document.getElementById('container'));
