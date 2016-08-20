import * as TYPES from '../constans/O-navigation-actiontypes';


function removeItem(id, list) {
  const index = list.findIndex(item => item.wrapperId === id);
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1),
  ];
}

function changeItem(id, opt, list) {
  const index = list.findIndex(item => item.wrapperId === id);
  return [
    ...list.slice(0, index),
    Object.assign({}, list[index], {
      opt,
    }),
    ...list.slice(index + 1),
  ];
}
const defaultState = {
  revData: [],
  revWebsites: [],
  revMenus: [],
  revCates: [],
  networkState: 1,
  onchangeWebsite: 0,
  selected: '请配置站点',
  selectedMenu: '选择编辑菜单',
  openAddDialog: false,
  openEditDialog: false,

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

    default:
      return state;
  }
}
