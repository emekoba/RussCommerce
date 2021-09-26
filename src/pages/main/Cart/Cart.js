import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {
  DispatchCommands,
  globalTheme,
  ProductPostTypes,
} from '../../../globals/globals';
import ProductPost from '../Product/Product.post';

function CartList({cartItems, clearCartCount, productList, navigation}) {
  const _theme = globalTheme['light'];

  useEffect(() => {
    // clearCartCount();
  }, []);

  return (
    <View style={_x(_theme).cart_list}>
      <View style={_x().header}>
        <Text style={_x().header_title}>Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <ProductPost
            type={ProductPostTypes.CART}
            id={productList[item].id}
            name={productList[item].title}
            image={productList[item].image}
            description={productList[item].description}
            navigation={navigation}
            inCart={productList[item]?.inCart}
            price={productList[item].price}
            rating={productList[item]?.rating?.rate}
          />
        )}
        contentContainerStyle={_x().main}
      />
    </View>
  );
}

function mapStateToProps(state) {
  return {
    productList: state.productList,
    cartItems: state.cart.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearCartCount: () =>
      dispatch({
        type: DispatchCommands.CLEAR_UNSEEN_CART_COUNT,
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);

const _x = theme => {
  return StyleSheet.create({
    cart_list: {
      flex: 1,
      backgroundColor: theme?.background,
    },
    header: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      // borderWidth: 1,
      // borderColor: 'wheat',
      elevation: 1,
    },
    header_title: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    main: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  });
};
