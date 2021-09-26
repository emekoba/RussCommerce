import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {globalTheme} from '../../../globals/globals';

function ProductListFilter({categories}) {
  const _theme = globalTheme['light'];

  return (
    <View style={_x(_theme).product_list_filter}>
      <Text></Text>
    </View>
  );
}

const _x = theme => {
  return StyleSheet.create({
    product_list_filter: {
      flex: 1,
      backgroundColor: theme?.background,
      width: '50%',
    },
  });
};

const mapStateToProps = state => {
  return {categories: state.productCategories};
};

export default connect(mapStateToProps)(ProductListFilter);
