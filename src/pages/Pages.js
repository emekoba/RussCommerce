import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './main/Product/Product.list';
import Cart from './main/Cart/Cart';
import {cartActive, home} from '../resources/resources';
import {connect} from 'react-redux';
import {globalTheme, SagaCommands} from '../globals/globals';

function Pages({unseenInCart, getAllProducts}) {
  const _theme = globalTheme['light'];

  useEffect(() => getAllProducts(), []);

  const TabNavigator = createBottomTabNavigator(
    {
      Products: {
        screen: Home,
        navigationOptions: () => ({
          tabBarIcon: () => (
            <Image source={home} style={{width: 30}} resizeMode="contain" />
          ),
        }),
      },
      Cart: {
        screen: Cart,
        navigationOptions: () => ({
          tabBarIcon: () => (
            <View style={{position: 'relative'}}>
              <Image
                source={cartActive}
                style={{width: 30}}
                resizeMode="contain"
              />

              {unseenInCart > 0 && (
                <View style={_x(_theme).badge}>
                  <Text style={_x(_theme).badge_txt}>{unseenInCart}</Text>
                </View>
              )}
            </View>
          ),
        }),
      },
    },
    {
      // initialRouteName: 'Cart',
      swipeEnabled: true,
      animationEnabled: true,
      tabBarOptions: {
        showLabel: false,
        style: {
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
        },
      },
    },
  );

  const AppTab = createAppContainer(TabNavigator);

  return <AppTab />;
}

function mapStateToProps(state) {
  return {
    unseenInCart: state.cart.unseen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllProducts: () =>
      dispatch({
        type: SagaCommands.FETCH_PRODUCTS,
        limit: 10,
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages);

const _x = theme => {
  return StyleSheet.create({
    badge: {
      backgroundColor: theme?.primary,
      height: 20,
      width: 20,
      borderRadius: 20,
      position: 'absolute',
      top: 10,
      left: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },

    badge_txt: {
      color: theme?.badge_text,
      fontWeight: 'bold',
      fontSize: 10,
    },
  });
};
