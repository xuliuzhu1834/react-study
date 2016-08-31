import * as TYPES from '../constans/O-navigation-actiontypes';

const defaultState = {
  open: false,
  nameValue: '',
  color: '1',
  imageMsgs: [{
    target: '',
    imgUrl: '',
    alt: '',
  }, {
    target: '',
    imgUrl: '',
    alt: '',
  }],
};

export default function navConter(state = defaultState, action) {
  switch (action.type) {
    case TYPES.INIT_CATEGORY_EDIT_DATA:
      return Object.assign({}, state, {
        nameValue: action.data.category_title,
        color: action.data.category_color,
        imageMsgs: (action.data.category_image && action.data.category_image.length) ?
          action.data.category_image :
          defaultState.imageMsgs,
      });
    case TYPES.IMG_MSG_CHANGE:
      return Object.assign({}, state, {
        imageMsgs: [
          ...state.imageMsgs.slice(0, action.index),
          Object.assign({}, state.imageMsgs[action.index], {
            [action.key]: action.value,
          }),
          ...state.imageMsgs.slice(action.index + 1),
        ],
      });
    case TYPES.COMPELETE_CATE_DETAILS:
      return Object.assign({}, state, {
        [action.key]: action.value,
      });
    default :
      return state;
  }
}
