import * as types from '../constans/O-navigation-actiontypes';


export function initState() {
  return {
    type: types.INITSTATE,
  };
}
export function compeleData(key, value) {
  return {
    type: types.COMPELETE,
    key,
    value,
  };
}
export function onchangeMenus(value) {
  return {
    type: types.SHOW_MENUS,
    value,
  };
}
