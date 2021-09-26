import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  AsyncStorage,
} from 'react-native';
import {connect} from 'react-redux';
import AppLoader from '../../../components/AppLoader';
import {logo, filter_light, filter_dark} from '../../../resources/resources';
import {
  globalTheme,
  SagaCommands,
  ProductPostTypes,
} from '../../../globals/globals';
import ProductPost from './Product.post';
import ProductListFilter from './Product.listFilter';
import Modal from 'react-native-modal';

function ProductList({
  getAllProducts,
  productList,
  navigation,
  getMoreProducts,
  cartData,
}) {
  const [listlimit, setlistlimit] = useState(10);

  const [filter, setfilter] = useState({
    isOpen: false,
  });

  const [firstload, setfirstload] = useState(false);

  const [refreshing, setrefreshing] = useState(false);

  const _theme = globalTheme['light'];

  // const [_theme, _settheme] = useState(globalTheme['light']);

  // const subscription = Appearance.addChangeListener(({colorScheme}) => {
  //   _settheme(globalTheme[colorScheme]);
  //   console.log(_theme);
  // });

  useEffect(() => {
    setrefreshing(false);
  }, [productList]);

  useEffect(() => {
    return () => {
      // _storeData = async () => {
      //   try {
      //     await AsyncStorage.setItem('users', 'I like to save it.');
      //   } catch (error) {
      //     // Error saving data
      //   }
      // };
    };
  }, []);

  function fetchMoreProducts() {
    setrefreshing(true);
    getMoreProducts(limit);
  }

  function openProductFilter() {
    setfilter({...filter, isOpen: true});
  }

  function closeProductFilter() {
    setfilter({...filter, isOpen: false});
  }

  return (
    <View style={_x(_theme).product_page}>
      <View style={_x().header}>
        <View style={{width: 40}} />

        <Image source={logo} style={{width: 50}} resizeMode="contain" />

        <TouchableOpacity onPress={openProductFilter}>
          <Image
            source={filter_light}
            style={{width: 40}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {productList ? (
        <FlatList
          refreshControl={
            <RefreshControl
              colors={['#9Bd35A', '#689F38']}
              refreshing={refreshing}
              onRefresh={() => {
                setlimit(limit + 10);
                fetchMoreProducts();
              }}
            />
          }
          numColumns={2}
          data={Object.keys(productList)}
          keyExtractor={item => productList[item].id}
          renderItem={({item}) => {
            return (
              <ProductPost
                type={ProductPostTypes.FEED}
                id={productList[item].id}
                name={productList[item].title}
                image={productList[item].image}
                description={productList[item].description}
                navigation={navigation}
                inCart={productList[item]?.inCart}
                price={productList[item].price}
                rating={productList[item].rating.rate}
              />
            );
          }}
          contentContainerStyle={_x().main}
        />
      ) : (
        <View style={[_x().main, {flex: 1, backgroundColor: 'red'}]}></View>
      )}

      <Modal
        isVisible={filter.isOpen}
        animationType="slide"
        animationIn="slideInRight"
        animationOut="slideOutRight"
        backdropOpacity={0}
        onBackButtonPress={closeProductFilter}
        onBackdropPress={closeProductFilter}
        useNativeDriver={true}
        style={{margin: 0, alignItems: 'flex-end'}}>
        <ProductListFilter />
      </Modal>

      <AppLoader />
    </View>
  );
}

function mapStateToProps(state) {
  return {
    productList: state.productList,
    cartData: state.cartData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMoreProducts: limit =>
      dispatch({
        type: SagaCommands.FETCH_MORE_PRODUCTS,
        limit,
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

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
  });
};
