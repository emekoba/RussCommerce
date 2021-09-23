import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './src/pages/onboarding/Login';
import Pages from './src/pages/Pages';
import SplashScreen from 'react-native-splash-screen';
// console.disableYellowBox = true;

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  Pages: {screen: Pages},
});

const AppContainer = createAppContainer(MainNavigator);

export default function App() {
  React.useEffect(() => SplashScreen.hide());

  return (
    /*<Provider store={store}>*/
    <AppContainer />
    /*</Provider>*/
  );
}
