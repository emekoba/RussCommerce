import {takeLatest, put, delay} from 'redux-saga/effects';
import {DispatchCommands, SagaCommands} from '../globals/globals';

//? ASYNCS.............................................................................................................................................

function* asyncLogin() {
  yield delay(4000);

  const userInfo = {
    name: 'Russell J Emekoba',
  };

  yield put({type: DispatchCommands.LOGIN, value: userInfo});
}

//? LISTENERS.............................................................................................................................................

export function* watchLogin() {
  yield takeLatest(SagaCommands.LOGIN, asyncLogin);
}
