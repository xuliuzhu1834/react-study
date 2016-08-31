import * as TYPES from '../constans/O-navigation-actiontypes';

const defaultState = {
  diyLinkUrl: '',
  diyLinkName: '',
};

export default function classfiction(state = defaultState, action) {
  switch (action.type) {
    case TYPES.COMPELETE_DIY:
      return Object.assign({}, state, {
        [action.key]: action.value,
      });
    default :
      return state;
  }
}

