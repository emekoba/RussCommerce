import {watchLogin} from './userSagas';
import {getAllProducts} from './productSagas';
import {all} from 'redux-saga/effects';

export function* combineSagas() {
  yield all([watchLogin(), getAllProducts()]);
}
