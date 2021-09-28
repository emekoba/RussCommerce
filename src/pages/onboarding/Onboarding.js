import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import AppLoader from '../../components/AppLoader';
import {
  globalTheme,
  AuthStates,
  DispatchCommands,
  SagaCommands,
} from '../../globals/globals';
import {logo} from '../../resources/resources';

function Onboarding({
  login,
  register,
  authState,
  toggleAuthStates,
  userLoggedIn,
  navigation,
}) {
  const [form, setform] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const _theme = globalTheme['light'];

  useEffect(() => {
    if (userLoggedIn) {
      navigation.navigate('Pages');
    }
  }, [userLoggedIn]);

  return (
    <View style={_x(_theme).login}>
      <View style={_x(_theme).logo}>
        <Image source={logo} style={{width: 100}} resizeMode="contain" />
      </View>

      <ScrollView contentContainerStyle={_x(_theme).main}>
        {authState === AuthStates.REGISTER && (
          <>
            <View style={_x(_theme).input_body}>
              <Text style={_x(_theme).text}>First Name :</Text>

              <TextInput
                style={_x(_theme).input}
                onChangeText={text => setform({...form, firstname: text})}
                value={form.firstname}
                placeholder="search list..."
                placeholderTextColor="lightslategrey"
                // autoFocus
                textContentType="name"
              />
            </View>

            <View style={_x(_theme).input_body}>
              <Text style={_x(_theme).text}>Last Name :</Text>

              <TextInput
                style={_x(_theme).input}
                onChangeText={text => setform({...form, lastname: text})}
                value={form.lastname}
                placeholder="search list..."
                placeholderTextColor="lightslategrey"
                textContentType="familyName"
              />
            </View>
          </>
        )}

        <View style={_x(_theme).input_body}>
          <Text style={_x(_theme).text}>Email :</Text>

          <TextInput
            style={_x(_theme).input}
            onChangeText={text => setform({...form, email: text})}
            value={form.email}
            placeholder="search list..."
            placeholderTextColor="lightslategrey"
            // autoFocus
            textContentType="emailAddress"
          />
        </View>

        <View style={_x(_theme).input_body}>
          <Text style={_x(_theme).text}>Password :</Text>

          <TextInput
            style={_x(_theme).input}
            onChangeText={text => setform({...form, password: text})}
            value={form.password}
            placeholder="search list..."
            placeholderTextColor="lightslategrey"
            textContentType="password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={_x(_theme).button}
          activeOpacity={0.5}
          onPress={() =>
            authState === AuthStates.LOGIN ? login(form) : register(form)
          }>
          <Text style={_x(_theme).btn_text}>{authState}</Text>
        </TouchableOpacity>

        <View style={_x(_theme).bottom}>
          {authState === AuthStates.LOGIN ? (
            <>
              <Text style={_x(_theme).bottom_text}>
                Youre New? Thats alright,
              </Text>

              <TouchableOpacity activeOpacity={0.5} onPress={toggleAuthStates}>
                <Text style={_x(_theme).hyperlink}> Register Here</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={_x(_theme).bottom_text}>Already Registered?</Text>

              <TouchableOpacity activeOpacity={0.5} onPress={toggleAuthStates}>
                <Text style={_x(_theme).hyperlink}> Go To Login</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      <AppLoader />
    </View>
  );
}

function mapStateToProps(state) {
  return {
    authState: state.authState,
    userLoggedIn: state.userLoggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: form => dispatch({type: SagaCommands.LOGIN, form}),

    register: form => dispatch({type: SagaCommands.REGISTER, form}),

    toggleAuthStates: () =>
      dispatch({type: DispatchCommands.TOGGLE_AUTH_STATE}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);

const _x = theme => {
  return StyleSheet.create({
    login: {
      flex: 1,
      backgroundColor: theme?.background,
    },
    logo: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    main: {
      flex: 1,
      // justifyContent: 'center',
      padding: 20,
    },
    text: {
      marginBottom: 10,
      marginLeft: 10,
      fontWeight: 'bold',
      color: theme?.text,
    },
    input_body: {
      // margin: 20,
      marginTop: 30,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: theme?.secondary,
      borderRadius: 5,
      paddingLeft: 20,
      color: theme?.text,
    },
    button: {
      marginTop: 50,
      height: 50,
      width: '100%',
      backgroundColor: theme?.secondary,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn_text: {
      fontWeight: 'bold',
      color: theme?.text,
    },
    bottom: {
      marginTop: 50,
      flexDirection: 'row',
    },
    bottom_text: {
      color: theme?.text,
    },
    hyperlink: {
      color: theme?.primary,
      fontWeight: 'bold',
    },
  });
};
