import React, {useEffect} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './src/pages/onboarding/Login';
import Pages from './src/pages/Pages';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './src/store/reducer';
import createSagaMiddleware from '@redux-saga/core';
import {combineSagas} from './src/sagas/rootSaga';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import ProductList from './src/pages/main/Product/Product.list';
import ProductPage from './src/pages/main/Product/Product.page';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(combineSagas);

const MainNavigator = createStackNavigator({
  Pages: {screen: Pages, navigationOptions: {headerShown: false}},
  Login: {screen: Login, navigationOptions: {headerShown: false}},
});

const AppContainer = createAppContainer(MainNavigator);

export default function App() {
  useEffect(() => SplashScreen.hide());

  let theme = useColorScheme();

  return (
    <Provider store={store}>
      <AppearanceProvider>
        <AppContainer theme={theme} />
        {/* <ProductPage /> */}
      </AppearanceProvider>
    </Provider>
  );
}

// function Epsilon({loader}) {
//   return (
// <Provider store={store}>
//   <AppearanceProvider>
//     <View style={_x.main}>
//       <AppContainer theme={theme} />
//     </View>
//   </AppearanceProvider>
// </Provider>
//   );
// }

// const _x = StyleSheet.create({
//   main: {
//     flex: 1,
//     position: 'relative',
//   },
// });

// function mapStateToProps(state) {
//   return {
//     productList: state.productList,
//   };
// }
