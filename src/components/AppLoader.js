import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {globalTheme} from '../globals/globals';

function AppLoader({isLoading}) {
  const _theme = globalTheme['light'];

  return (
    <>
      {isLoading && (
        <View style={[StyleSheet.absoluteFill, _x(_theme).main]}>
          <ActivityIndicator size="large" color={_theme.primary} />
        </View>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    isLoading: state.loader.isLoading,
  };
}

export default connect(mapStateToProps)(AppLoader);

const _x = theme => {
  return StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  });
};
