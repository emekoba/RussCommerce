import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {globalTheme, DispatchCommands} from '../../../globals/globals';

function ProductPage({getSingleProduct, id, productPreview}) {
  const _theme = globalTheme['light'];

  useEffect(() => {
    getSingleProduct(id);
  }, []);

  return (
    <View style={_x(_theme).product_page}>
      <Image
        source={{
          uri: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
        }}
        style={{width: null, height: 400}}
        resizeMode="contain"
      />

      <View style={_x(_theme).product_page_row2}>
        <Text style={_x(_theme).name}>Product Page</Text>
        <Text style={_x(_theme).description}>Product Page</Text>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    productPreview: state.productPreview,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSingleProduct: id =>
      dispatch({
        type: DispatchCommands.GET_SINGLE_PRODUCT,
        id,
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);

const _x = theme => {
  return StyleSheet.create({
    product_page: {
      flex: 1,
      backgroundColor: theme?.background,
    },

    header: {
      height: 70,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
    },
    main: {
      paddingLeft: 10,
      paddingRight: 10,
    },

    product_page_row2: {
      height: 300,
      backgroundColor: 'red',
    },
  });
};
