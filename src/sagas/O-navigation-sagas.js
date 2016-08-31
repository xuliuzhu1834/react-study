import { call, put, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

import {
  globalHint,
} from '../middlewares/hint';
import { SHOW_WESITE, LOADED_WEBSITE, LOADED_CATEGORYS_DETAILS,
  SHOW_MENUS, LOADED_MENUS, SHOW_CATEGORYS_DETAILS,
  LOADED_CATEGORYS, SHOW_CATEGORYS, EDIT_MENU_NAME, EDIT_MENU_NAME_RESULT,
  DELETE_MENU_NAME, DELETE_MENU_NAME_RESULT, LOAD_CONFIG_ALL, SHOW_CONFIG_ALL,
  EDIT_CONDIG_MENU_STATUS, EDIT_CONDIG_MENU_STATUS_RESULT, CATEGORYS_DETAILS_SAVE,
  CATEGORYS_DETAILS_SAVE_RESULT, CATE_IMG_UPLOAD, CATE_IMG_UPLOAD_RESULT,
} from '../constans/O-navigation-actiontypes';
import { fetchParams, msgDataChange } from '../actions/O-navigation-action';

// get
function* showConfigAll(action) {
  const url = `${process.env.BASE_URI}site?site_uid=${encodeURI(action.papram)}`;
  const configsData = yield fetch(url, {
    method: 'get',
    credentials: 'include',
  }).then((res) => res.json());
  yield put({ type: LOAD_CONFIG_ALL, data: configsData });
}
function* takeConfigAll() {
  yield takeLatest(SHOW_CONFIG_ALL, showConfigAll);
}


function* showWebsite() {
  const url = `${process.env.BASE_URI}site/list?id=${encodeURI(7)}`;
  const sitesData = yield fetch(url, {
    method: 'get',
    credentials: 'include',
  }).then((res) => res.json());
  yield put({ type: LOADED_WEBSITE, data: sitesData });
}
function* takeWebsite() {
  yield takeLatest(SHOW_WESITE, showWebsite);
}

function* showMenus(action) {
  const url = `${process.env.BASE_URI}nav/menus?site_uid=${encodeURI(action.papram)}`;
  const menusData = yield fetch(url, {
    method: 'get',
    credentials: 'include',
  }).then((res) => res.json());
  yield put({ type: LOADED_MENUS, data: menusData });
}
function* takeMenus() {
  yield takeLatest(SHOW_MENUS, showMenus);
}

function* showCates(action) {
  const url = `${process.env.BASE_URI}nav/categorys?site_uid=${encodeURI(action.papram)}`;
  const cates = yield fetch(url, {
    method: 'get',
    credentials: 'include',
  }).then((res) => res.json());
  yield put({ type: LOADED_CATEGORYS, data: cates });
}

function* takeCates() {
  yield takeLatest(SHOW_CATEGORYS, showCates);
}

// put
function* editMenuName(action) {
  const url = `${process.env.BASE_URI}nav/menus/${encodeURI(action.papram.menu_id)}`;
  const response = yield fetch(url, {
    method: 'put',
    credentials: 'include',
    body: JSON.stringify(action.papram),
  }).then((res) => res.json());
  if (response.msg === 'ok') {
    yield put({ type: EDIT_MENU_NAME_RESULT, id: action.papram.menu_id });
  }
}
function* takeEditMenuName() {
  yield takeLatest(EDIT_MENU_NAME, editMenuName);
}

function* editConfigMenuStatus(action) {
  const url = `${process.env.BASE_URI}nav/menus/${encodeURI(action.papram.menu_id)}`;
  const response = yield fetch(url, {
    method: 'put',
    credentials: 'include',
    body: JSON.stringify(action.papram),
  }).then((res) => res.json());
  if (response.msg === 'ok') {
    yield put({ type: EDIT_CONDIG_MENU_STATUS_RESULT,
      data: response.info,
      id: action.papram.menu_id,
      status: action.papram.menu_status,
    });
    yield put(fetchParams(SHOW_CONFIG_ALL, action.papram.site_uid));
  }
}
function* takeConfigEditMenuStatus() {
  yield takeLatest(EDIT_CONDIG_MENU_STATUS, editConfigMenuStatus);
}


function* deleteMenu(action) {
  const url = `${process.env.BASE_URI}nav/menus/${encodeURI(action.papram.menu_id)}`;
  const response = yield fetch(url, {
    method: 'put',
    credentials: 'include',
    body: JSON.stringify(action.papram),
  }).then((res) => res.json());
  if (response.msg === 'ok') {
    yield put({ type: DELETE_MENU_NAME_RESULT, msg: '删除成功', id: action.papram.menu_id });
  }
}

function* takeDeleteMenu() {
  yield takeLatest(DELETE_MENU_NAME, deleteMenu);
}

function* showCateDetails(action) {
  const url = `${process.env.BASE_URI}nav/menu?id=${encodeURI(action.papram)}`;
  const cateDetails = yield fetch(url, {
    method: 'get',
    credentials: 'include',
  }).then((res) => res.json());
  yield put({ type: LOADED_CATEGORYS_DETAILS, data: cateDetails });
}
function* takeCateDetails() {
  yield takeLatest(SHOW_CATEGORYS_DETAILS, showCateDetails);
}

function* categorysDetailsSave(action) {
  let url = '';
  let method = {};
  if (action.papram.menu_id.indexOf('temp') > -1) {
    url = `${process.env.BASE_URI}nav/menu`;
    method = { method: 'post' };
  } else {
    url = `${process.env.BASE_URI}nav/menu/${encodeURI(action.papram.menu_id)}`;
    method = { method: 'put' };
  }

  const response = yield fetch(url, {
    method: method.method,
    credentials: 'include',
    body: JSON.stringify(action.papram),
  }).then((res) => res.json());
  if (response.msg === 'ok') {
    // 需要返回menuId
    yield put({ type: CATEGORYS_DETAILS_SAVE_RESULT, msg: '操作成功' });
  }
}

function* takeCategorysDetailsSave() {
  yield takeLatest(CATEGORYS_DETAILS_SAVE, categorysDetailsSave);
}

function* imgUpload(action) {
  const url = `${process.env.BASE_URI}nav/category/imageupload`;
  const response = yield fetch(url, {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(action.papram),
  }).then((res) => res.json());
  if (response.msg === 'ok') {
    // 需要返回menuId
    yield put(msgDataChange(action.papram.index, 'target', response.info.img_url));
    yield put(globalHint('操作成功'));
  } else {
    yield put(globalHint('操作失败'));
  }
}
function* takeImgUpload() {
  yield takeLatest(CATE_IMG_UPLOAD, imgUpload);
}

function wrapper(fn) {
  return function* () {
    for (let i = 0; i < 100; i++) {
      try {
        yield call(fn);
        break;
      } catch (e) {
        console.log(e);
      }
    }
  };
}

export default function* () {
  yield fork(wrapper(takeWebsite));
  yield fork(wrapper(takeMenus));
  yield fork(wrapper(takeCateDetails));
  yield fork(wrapper(takeCates));
  yield fork(wrapper(takeEditMenuName));
  yield fork(wrapper(takeDeleteMenu));
  yield fork(wrapper(takeConfigAll));
  yield fork(wrapper(takeConfigEditMenuStatus));
  yield fork(wrapper(takeCategorysDetailsSave));
  yield fork(wrapper(takeImgUpload));
}

