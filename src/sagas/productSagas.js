import {takeLatest, put, call, take} from 'redux-saga/effects';
import {DispatchCommands, SagaCommands} from '../globals/globals';

//? ASYNCS.............................................................................................................................................

function* asyncGetAllProducts(action) {
  console.log('getting products...');

  yield put({type: DispatchCommands.START_LOADER});

  const products = yield fetch(
    `https://fakestoreapi.com/products?limit=${action.limit}`,
  )
    .then(res => res.json())
    .then(json => json);

  if (products != null) {
    // console.log('all products', products);

    let categories = [...new Set(products.map(e => e.category))];

    yield put({type: DispatchCommands.STOP_LOADER});

    yield put({
      type: DispatchCommands.STORE_ALL_PRODUCTS,
      payload: {products, categories},
    });
  }
}

//? LISTENERS.............................................................................................................................................

export function* getAllProducts() {
  yield takeLatest(SagaCommands.FETCH_PRODUCTS, asyncGetAllProducts);
}
