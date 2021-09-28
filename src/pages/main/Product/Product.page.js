import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {
  globalTheme,
  DispatchCommands,
  ProductPostTypes,
} from '../../../globals/globals';
import {cartActive, cartDisbled} from '../../../resources/resources';

function ProductPage({previewInfo, addToCart, removeFromCart}) {
  const _theme = globalTheme['light'];

  function toggleCart() {
    // if (!previewInfo.inCart)
    //   addToCart(previewInfo?.id, ProductPostTypes.PREVIEW);
    // else removeFromCart(previewInfo?.id, ProductPostTypes.PREVIEW);
  }

  return (
    <View style={_x(_theme).product_page}>
      <Text style={[_x(_theme).text, _x(_theme).name]}>{previewInfo.name}</Text>

      <View
      
        style={{
          borderWidth: 2,
          borderColor: _theme.secondary,
          padding: 20,
          margin: 10,
          borderRadius: 10,
        }}>
        <Image
          source={{uri: previewInfo.image}}
          style={{height: 280}}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={_x(_theme).main}>
        <View style={_x().row1}>
          <Text style={[_x(_theme).text, _x().rating]}>
            {previewInfo?.rating?.rate}
          </Text>

          <Text style={[_x(_theme).text, _x(_theme).price]}>
            ${previewInfo?.price}
          </Text>
        </View>

        <Text style={[_x(_theme).text, _x(_theme).description]}>
          {previewInfo?.description}
        </Text>

        <View style={_x().row2}>
          {previewInfo?.category && (
            <View style={_x(_theme).category}>
              <Text style={[_x(_theme).text, _x(_theme).category_txt]}>
                {previewInfo?.category}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={_x().buttonBar}>
        <TouchableOpacity style={_x(_theme).btn} onPress={toggleCart}>
          <Image
            source={previewInfo?.inCart ? cartActive : cartDisbled}
            style={{width: 35, height: 35, transform: [{scaleX: -1}]}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
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

export default connect(null, mapDispatchToProps)(ProductPage);

const _x = theme => {
  return StyleSheet.create({
    product_page: {
      flex: 1,
      backgroundColor: theme?.background,
      position: 'relative',
      width: '100%',
    },
    header: {
      height: 70,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
    },
    main: {
      height: 300,
      // backgroundColor: 'red',
      padding: 20,
      paddingTop: 0,
      marginTop: 15,
    },
    row1: {
      flexDirection: 'row',
      marginBottom: 10,
      justifyContent: 'space-between',
    },
    row2: {
      marginTop: 20,
      alignItems: 'flex-start',
    },
    category: {
      height: 35,
      paddingLeft: 12,
      paddingRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme?.primary,
      borderRadius: 40,
    },
    category_txt: {
      fontSize: 15,
      color: theme?.contrast_text,
    },
    text: {
      color: theme?.text,
    },
    name: {
      fontWeight: 'bold',
      fontSize: 20,
      padding: 20,
    },
    description: {
      lineHeight: 20,
    },
    price: {
      fontSize: 20,
      color: theme?.primary,
    },
    rating: {
      fontSize: 20,
    },
    buttonBar: {
      position: 'absolute',
      bottom: 30,
      right: 30,
    },
    btn: {
      width: 60,
      height: 60,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
      borderWidth: 2,
      borderColor: theme?.secondary,
      backgroundColor: theme?.background,
    },
  });
};
