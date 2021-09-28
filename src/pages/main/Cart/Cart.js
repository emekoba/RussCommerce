import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import {
  DispatchCommands,
  globalTheme,
  ProductPostTypes,
} from '../../../globals/globals';
import ProductPage from '../Product/Product.page';
import ProductPost from '../Product/Product.post';

function CartList({cartItems, clearCartCount, productList, navigation}) {
  const _theme = globalTheme['light'];

  const [productpreview, setproductpreview] = useState({
    previewInfo: '',
    isOpen: false,
  });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', function () {
      closeProductPreview();

      return true;
    });
    // clearCartCount();
  }, []);

  function openProductPreview(previewInfo) {
    // setproductpreview({...productpreview, previewInfo, isOpen: true});
  }

  function closeProductPreview() {
    setproductpreview({...productpreview, isOpen: false});

    console.log(productpreview.isOpen);
  }

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
            inCart={productList[item]?.inCart}
            price={productList[item].price}
            rating={productList[item]?.rating?.rate}
            onPress={openProductPreview}
          />
        )}
        contentContainerStyle={_x().main}
      />

      {/* {productpreview.isOpen && ( */}
      {/* <Modal
        isVisible={productpreview.isOpen}
        onBackButtonPress={closeProductPreview}
        onBackdropPress={closeProductPreview}
        useNativeDriver={true}
        style={{margin: 0}}>
        <ProductPage previewInfo={productpreview.previewInfo} />
      </Modal> */}
      {/* )} */}
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
