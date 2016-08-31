import { combineReducers } from 'redux';
import getMsg from './O-navigation-get-msg';
import selectCates from './O-navigation-select-cates';
import classfiction from './O-navigation-classfiction';
import configAll from './O-navigation-config-all';
import navConter from './O-navigation-nav-conter';

export default combineReducers({
  getMsg,
  selectCates,
  classfiction,
  configAll,
  navConter,
});
