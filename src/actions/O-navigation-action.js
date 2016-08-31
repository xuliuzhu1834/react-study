import * as types from '../constans/O-navigation-actiontypes';

export function compeleData(key, value) {
  return {
    type: types.COMPELETE,
    key,
    value,
  };
}

export function compeleDIYData(key, value) {
  return {
    type: types.COMPELETE_DIY,
    key,
    value,
  };
}
export function compeleCateData(key, value) {
  return {
    type: types.COMPELETE_CATE_DETAILS,
    key,
    value,
  };
}
export function msgDataChange(index, key, value) {
  return {
    type: types.IMG_MSG_CHANGE,
    index,
    key,
    value,
  };
}

export function fetchParams(typeCode, args) {
  return {
    type: typeCode,
    papram: args,
  };
}
export function addMenuName(menuName, tempId) {
  return {
    type: types.ADD_MENU_NAME,
    value: menuName,
    id: tempId,
  };
}
export function addDiyLink(diyurl, diyname) {
  return {
    type: types.ADD_DIY_LINK,
    url: diyurl,
    name: diyname,
  };
}
export function addNomalCate(value) {
  return {
    type: types.ADD_NORMAL_CATERGORY,
    value,
  };
}

export function toggleChecked(id, value) {
  return {
    type: types.TOGGLE_SELECTED_ITEM,
    id,
    value,
  };
}

export function genCateDetailData(value) {
  return {
    type: types.GEN_DETAILS_DATA,
    value,
  };
}

export function initCateEditData(value) {
  return {
    type: types.INIT_CATEGORY_EDIT_DATA,
    data: value,
  };
}
