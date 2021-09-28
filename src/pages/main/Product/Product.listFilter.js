// import {CheckBox, CheckBoxBase} from '@react-native-community/checkbox';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {DispatchCommands, globalTheme} from '../../../globals/globals';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

function ProductListFilter({categories, toggleActiveCategory, logout}) {
  const _theme = globalTheme['light'];

  return (
    <View style={_x(_theme).product_list_filter}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        {Object.keys(categories).map(key => (
          <View style={_x(_theme).block} key={key}>
            <Switch
              trackColor={{false: '#767577', true: _theme?.secondary}}
              thumbColor={
                categories[key] ? _theme?.primary : _theme?.background
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleActiveCategory(key)}
              value={categories[key]}
            />

            <Text style={_x(_theme).text}>{key}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <TouchableOpacity style={{width: 40, height: 40}} onPress={logout}>
          <Icon name="logout" size={30} color={_theme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    categories: state.productCategories,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    toggleActiveCategory: category =>
      dispatch({
        type: DispatchCommands.TOGGLE_ACTIVE_CATEGORY,
        payload: category,
      }),
    logout: () =>
      dispatch({
        type: DispatchCommands.LOGOUT,
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListFilter);

const _x = theme => {
  return StyleSheet.create({
    product_list_filter: {
      // flex: 1,
      backgroundColor: theme?.background,
      width: '60%',
      height: 400,
      padding: 20,
      margin: 20,
      borderRadius: 10,
    },

    block: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      // justifyContent: 'space-between',
    },

    text: {
      marginLeft: 50,
      fontWeight: 'bold',
      color: theme?.text,
    },
  });
};
