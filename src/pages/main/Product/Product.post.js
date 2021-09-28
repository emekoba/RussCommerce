import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import {
  DispatchCommands,
  globalTheme,
  ProductPostTypes,
} from '../../../globals/globals';
import {cartActive, cartDisbled} from '../../../resources/resources';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';

function ProductPost({
  id,
  name,
  image,
  price,
  description,
  inCart,
  rating,
  addToCart,
  type,
  removeFromCart,
  onPress,
}) {
  const _theme = globalTheme['light'];

  function toggleCart() {
    if (!inCart) addToCart(id, type);
    else removeFromCart(id, type);
  }

  return (
    <TouchableOpacity
      style={[
        _x(_theme).product_post,
        {width: type === ProductPostTypes.CART ? '95%' : '45%'},
      ]}
      activeOpacity={0.9}
      onPress={() =>
        onPress({id, name, image, price, description, inCart, rating})
      }>
      <Image
        source={{uri: image}}
        style={{height: 100, marginTop: 20, margin: 10}}
        resizeMode="contain"
      />

      <View style={_x().bottom}>
        <Text style={[_x(_theme).text, {fontSize: 15}]}>{name}</Text>

        {type === ProductPostTypes.CART && (
          <Text style={_x(_theme).description}>{description}</Text>
        )}

        <View style={_x().bottom_row1}></View>

        <View style={_x().bottom_row2}>
          <View style={_x().bottom_row2_col1}>
            <Text
              style={[
                _x(_theme).text,
                {fontStyle: 'italic', color: _theme.primary},
              ]}>
              ${price}
            </Text>

            <Text style={[_x(_theme).text, {fontStyle: 'italic'}]}>
              {rating}
            </Text>
          </View>

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(_theme.primary, true)}
            onPress={toggleCart}>
            <View style={_x().btn}>
              <Image
                source={inCart === true ? cartActive : cartDisbled}
                style={{width: 20, transform: [{scaleX: -1}]}}
                resizeMode="contain"
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (id, type) =>
      dispatch({type: DispatchCommands.ADD_TO_CART, payload: {id, type}}),

    removeFromCart: (id, type) =>
      dispatch({type: DispatchCommands.REMOVE_FROM_CART, payload: {id, type}}),
  };
}

export default connect(null, mapDispatchToProps)(ProductPost);

const _x = theme => {
  return StyleSheet.create({
    product_post: {
      backgroundColor: theme?.background,
      // elevation: 5,
      marginBottom: 20,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: 'wheat',
      elevation: 1,
      margin: 10,
    },

    bottom: {
      flex: 1,
      padding: 10,
      // backgroundColor: 'lightgrey',
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderTopWidth: 2,
      borderTopColor: 'wheat',
    },

    text: {
      color: theme?.text,
      fontWeight: 'bold',
      // marginBottom: 10,
    },

    description: {
      color: theme?.text,
      fontWeight: 'bold',
      // fontStyle: 'italic',
      color: 'grey',
      marginTop: 10,
      marginBottom: 10,
      fontSize: 9,
      lineHeight: 15,
    },

    bottom_row1: {
      flex: 1,
      // backgroundColor: 'blue',
      height: '100%',
    },

    bottom_row2: {
      height: 40,
      flexDirection: 'row',
      // backgroundColor: 'red',
      alignItems: 'center',
    },

    bottom_row2_col1: {
      flex: 1,
    },

    btn: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      // backgroundColor: 'red',
    },
  });
};
