import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  AsyncStorage,
  Keyboard,
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
import ProductPage from './Product.page';
import {Appearance} from 'react-native-appearance';

function ProductList({productList, categories, getMoreProducts, themeState}) {
  const [listlimit, setlistlimit] = useState(10);

  const [filter, setfilter] = useState(false);

  const [refreshing, setrefreshing] = useState(false);

  const [activeCategories, setactiveCategories] = useState([]);

  const [productpreview, setproductpreview] = useState({
    previewInfo: '',
    isOpen: false,
  });

  const _theme = globalTheme[themeState];

  useEffect(() => {
    // const subscription = Appearance.addChangeListener(({colorScheme}) => {
    //   setThemeState(colorScheme);
    // });
    // return () => subscription.remove();
  }, []);

  useEffect(() => setrefreshing(false), [productList]);

  useEffect(() => {
    setactiveCategories(
      Object.keys(categories).filter(e => categories[e] === true),
    );
  }, [categories]);

  useEffect(() => {
    Keyboard.dismiss();

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
    getMoreProducts(listlimit);
  }

  function openProductFilter() {
    setfilter(true);
  }

  function closeProductFilter() {
    setfilter(false);
  }

  function openProductPreview(previewInfo) {
    setproductpreview({...productpreview, previewInfo, isOpen: true});
  }

  function closeProductPreview() {
    setproductpreview({...productpreview, isOpen: false});
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
                setlistlimit(listlimit + 10);
                fetchMoreProducts();
              }}
            />
          }
          numColumns={2}
          data={Object.keys(productList)}
          keyExtractor={item => productList[item].id}
          renderItem={({item}) => {
            if (
              activeCategories.includes(productList[item].category) ||
              activeCategories.length === 0
            ) {
              return (
                <ProductPost
                  type={ProductPostTypes.FEED}
                  id={productList[item].id}
                  name={productList[item].title}
                  image={productList[item].image}
                  description={productList[item].description}
                  inCart={productList[item]?.inCart}
                  category={productList[item].category}
                  price={productList[item].price}
                  rating={productList[item].rating.rate}
                  onPress={openProductPreview}
                />
              );
            }
          }}
          contentContainerStyle={_x().main}
        />
      ) : (
        <View style={[_x().main, {flex: 1, backgroundColor: 'red'}]}></View>
      )}

      <Modal
        isVisible={productpreview.isOpen}
        onBackButtonPress={closeProductPreview}
        onBackdropPress={closeProductPreview}
        useNativeDriver={true}
        style={{margin: 0}}>
        <ProductPage previewInfo={productpreview.previewInfo} />
      </Modal>

      <Modal
        isVisible={filter}
        animationType="slide"
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.2}
        onBackButtonPress={closeProductFilter}
        onBackdropPress={closeProductFilter}
        useNativeDriver={true}
        style={{
          margin: 0,
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
        }}>
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
    categories: state.productCategories,
    themeState: state.themeState,
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
