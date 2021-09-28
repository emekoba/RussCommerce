import React, {useEffect} from 'react';
import {AsyncStorage, Image, StyleSheet, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './main/Product/Product.list';
import Cart from './main/Cart/Cart';
import {cartActive, home} from '../resources/resources';
import {connect} from 'react-redux';
import {DispatchCommands, globalTheme, SagaCommands} from '../globals/globals';

function Pages({
  getAllProducts,
  productList,
  productCategories,
  cartData,
  userData,
  updateUserProgress,
}) {
  const _theme = globalTheme['light'];

  // useEffect(() => getAllProducts(), []);

  useEffect(() => {
    AsyncStorage.getItem('users-collection')
      .then(users_collection => {
        users_collection = JSON.parse(users_collection);

        if (
          users_collection[userData.id]['productList'] && // 👈 null and undefined check
          Object.keys(users_collection[userData.id]['productList']).length ===
            0 &&
          Object.getPrototypeOf(
            users_collection[userData.id]['productList'],
          ) === Object.prototype
        ) {
          getAllProducts();
        } else {
          updateUserProgress(users_collection[userData.id]);
        }
      })
      .catch(e => console.log('error', e));

    return () => {
      AsyncStorage.getItem('users-collection')
        .then(users_collection => {
          users_collection = JSON.parse(users_collection);

          users_collection[userData.id] = {
            ...users_collection[userData.id],
            cart: cartData,
            productList,
            productCategories,
          };

          console.log(users_collection[userData.id]);

          AsyncStorage.setItem(
            'users-collection',
            JSON.stringify(users_collection),
          ).then(() => console.log('users-collection backed up'));
        })
        .catch(e => console.log('error', e));
    };
  }, []);

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

              {/* {cartData.unseen > 0 && (
                <View style={_x(_theme).badge}>
                  <Text style={_x(_theme).badge_txt}>{unseenInCart}</Text>
                </View>
              )} */}
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
    productList: state.productList,
    cartData: state.cart,
    productCategories: state.productCategories,
    userData: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllProducts: () =>
      dispatch({
        type: SagaCommands.FETCH_PRODUCTS,
        limit: 10,
      }),

    updateUserProgress: progress =>
      dispatch({
        type: DispatchCommands.UPDATE_PAST_USER_ACTIVITY,
        payload: progress,
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
