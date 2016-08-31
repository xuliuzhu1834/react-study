import * as TYPES from '../constans/O-navigation-actiontypes';

const defaultState = {
  revData: [],
  networkState: 1,
  revCates: [],
  cancelCates: [],
  allChecked: false,
};

export default function selectCates(state = defaultState, action) {
  switch (action.type) {
    case TYPES.LOADED_WEBSITE:
      return Object.assign({}, state, {
        revData: action.data.info,
        networkState: 2,
      });

    default:
      return state;
  }
}
