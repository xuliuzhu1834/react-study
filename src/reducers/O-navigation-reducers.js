import * as TYPES from '../constans/O-navigation-actiontypes';

const defaultState = {
  revData: [],
  revWebsites: [],
  revMenus: [],
  revCates: [],
  cancelCates: [],
  parentChecked: false,
  networkState: 1,
  onchangeWebsite: 0,
  selected: '请配置站点',
  selectedMenu: '选择编辑菜单',
  openAddDialog: false,
  openEditDialog: false,
  allChecked: false,
};

export default function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case TYPES.LOADED_WEBSITE:
      return Object.assign({}, state, {
        revWebsites: action.data.map((item) => item.website),
        revData: action.data,
        networkState: 2,
      });
    case TYPES.SHOW_MENUS:
      return Object.assign({}, state, {
        revMenus: action.value,
      });
    case TYPES.COMPELETE:
      return Object.assign({}, state, {
        [action.key]: action.value,
      });
    case TYPES.ADD_SELECTED_ITEM:
      return Object.assign({}, state, {
        revCates: [...state.revCates, action.id],
      });
    case TYPES.REMOVE_SELECTED_ITEM:
      return Object.assign({}, state, {
        revCates: [
          ...state.revCates.slice(0, state.revCates.indexOf(action.id)),
          ...state.revCates.slice(state.revCates.indexOf(action.id) + 1),
        ],
      });
    case TYPES.ADD_DESELECTED_ITEM:
      return Object.assign({}, state, {
        cancelCates: [...state.cancelCates, action.id],
      });
    case TYPES.REMOVE_DESELECTED_ITEM:
      return Object.assign({}, state, {
        cancelCates: [
          ...state.cancelCates.slice(0, state.cancelCates.indexOf(action.id)),
          ...state.cancelCates.slice(state.cancelCates.indexOf(action.id) + 1),
        ],
      });
    case TYPES.SELECT_ALL_CATES_TOGGLE:
      return Object.assign({}, state, {
        allChecked: !state.allChecked,
      });
    default:
      return state;
  }
}
