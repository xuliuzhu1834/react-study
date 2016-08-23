import * as types from '../constans/O-navigation-actiontypes';

export function compeleData(key, value) {
  return {
    type: types.COMPELETE,
    key,
    value,
  };
}

export function childrenChecked(id) {
  return {
    type: types.ADD_SELECTED_ITEM,
    id,
  };
}

export function childrenCheckedCancel(id) {
  return {
    type: types.REMOVE_SELECTED_ITEM,
    id,
  };
}

export function deselectWhenParentChecked(id) {
  return {
    type: types.ADD_DESELECTED_ITEM,
    id,
  };
}

export function deselectWhenParentCheckedCalcel(id) {
  return {
    type: types.REMOVE_DESELECTED_ITEM,
    id,
  };
}

export function onchangeMenus(value) {
  return {
    type: types.SHOW_MENUS,
    value,
  };
}
