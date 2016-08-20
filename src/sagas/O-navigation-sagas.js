import { take, call, put } from 'redux-saga/effects';

import { SHOW_WESITE, LOADED_WEBSITE } from '../constans/O-navigation-actiontypes';

function* showWebsite() {
  const data = yield fetch('./src/testData.json', {
    method: 'get',
    credentials: 'include',
  })
    .then((res) => res.json());
  yield put({ type: LOADED_WEBSITE, data: data.name });
}

export default function* () {
  yield take(SHOW_WESITE);

  yield call(showWebsite);
}
