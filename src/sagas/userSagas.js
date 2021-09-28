import {Alert, AsyncStorage} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';
import {
  AuthStates,
  DispatchCommands,
  generateId,
  SagaCommands,
} from '../globals/globals';

//? ASYNCS.............................................................................................................................................

function* asyncLogin(action) {
  // yield put({type: DispatchCommands.START_LOADER});

  let userInfo = {};

  let userExists = true;

  const {password, email} = action.form;

  yield AsyncStorage.getItem('users-collection')
    .then(users_collection => {
      if (users_collection) {
        users_collection = JSON.parse(users_collection);

        Object.keys(users_collection).map(key => {
          if (
            users_collection[key]['email'] === email &&
            users_collection[key]['password'] === password
          ) {
            userExists = true;
            userInfo = {...users_collection[key], id: key};

            delete userInfo['password'];
          }
        });
      } else {
        console.log('users collection does not exist');

        Alert.alert('Error', 'User Does Not Exist. Please Register', [
          {
            text: 'Ok',
            style: 'Ok',
          },
        ]);
      }
    })
    .catch(e => {
      console.log('error', e);
    });

  // yield put({type: DispatchCommands.STOP_LOADER});

  // stopLoader();

  if (userExists) {
    yield put({
      type: DispatchCommands.LOGIN,
      payload: userInfo,
    });
  } else {
    console.log('incorrect email or password');

    Alert.alert('Error', 'Incorrect Email or Password', [
      {
        text: 'Ok',
        style: 'Ok',
      },
    ]);
  }
}

function* triggerLoginDispatch(userInfo) {
  yield put({type: DispatchCommands.LOGIN, payload: userInfo});
}

function* stopLoader() {
  yield put({type: DispatchCommands.STOP_LOADER});
}

function* asyncRegister(action) {
  yield put({type: DispatchCommands.START_LOADER});

  AsyncStorage.getItem('users-collection')
    .then(users_collection => {
      if (users_collection) {
        console.log('users collection exists');

        users_collection = JSON.parse(users_collection);

        users_collection[generateId()] = action.form;

        console.log(users_collection);

        AsyncStorage.setItem(
          'users-collection',
          JSON.stringify(users_collection),
        ).then(() =>
          console.log('users-collection retrieved, edited and stored'),
        );
      } else {
        console.log('users collection does not exist');

        const newUserCollection = {};

        newUserCollection[generateId()] = action.form;

        console.log(newUserCollection);

        AsyncStorage.setItem(
          'users-collection',
          JSON.stringify(newUserCollection),
        ).then(() => console.log('users-collection created and stored'));
      }
    })
    .catch(e => {
      console.log('error', e);

      Alert.alert('Failed', 'Registration Failed', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    });

  Alert.alert('Success', 'Registration Successful', [
    {
      text: 'Ok',
      style: 'cancel',
    },
  ]);

  yield put({type: DispatchCommands.STOP_LOADER});

  yield put({
    type: DispatchCommands.CHANGE_AUTH_STATE,
    payload: AuthStates.LOGIN,
  });
}

//? LISTENERS.............................................................................................................................................

export function* watchLogin() {
  yield takeLatest(SagaCommands.LOGIN, asyncLogin);
}

export function* watchRegister() {
  yield takeLatest(SagaCommands.REGISTER, asyncRegister);
}
