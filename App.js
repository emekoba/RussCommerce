import React, {useEffect} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Onboarding from './src/pages/onboarding/Onboarding';
import Pages from './src/pages/Pages';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './src/store/reducer';
import createSagaMiddleware from '@redux-saga/core';
import {combineSagas} from './src/sagas/rootSaga';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(combineSagas);

const MainNavigator = createStackNavigator(
  {
    Pages: {screen: Pages, navigationOptions: {headerShown: false}},
    Onboarding: {screen: Onboarding, navigationOptions: {headerShown: false}},
  },
  {initialRouteName: 'Onboarding'},
);

const AppContainer = createAppContainer(MainNavigator);

export default function App() {
  useEffect(() => SplashScreen.hide());

  let theme = useColorScheme();

  return (
    <Provider store={store}>
      <AppearanceProvider>
        <AppContainer theme={theme} />
      </AppearanceProvider>
    </Provider>
  );
}
