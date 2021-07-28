import React, {useEffect, useState, useReducer, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
  TextInput,
  useColorScheme,
  ActivityIndicator,
  KeyboardAvoidingView,
  View,
  FlatList,
  Text,
  Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MaterialHeaderButtons} from '../../components/UI/HeaderButton';
import {Item} from 'react-navigation-header-buttons';

import Colors from '../../constants/colors/Colors';
import {HeaderTitle} from 'react-navigation-stack';
import ProductItem from '../../components/shop/ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import {Input} from '../../components/UI/Input';
import * as productActions from '../../store/actions/products';
import * as authActions from '../../store/actions/auth';

const formReducer = (state, action) => {
  if (action.type === 'FORM_INPUT_UPDATE') {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidaties = {
      ...state.inputValidaties,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidaties) {
      updatedFormIsValid = updatedFormIsValid && updatedValidaties[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidaties: updatedValidaties,
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidaties: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      // setTitle(text);
      dispatchFormState({
        type: 'FORM_INPUT_UPDATE',
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={10}
      style={styles.screen}>
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <View style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              errorText="Please input a valid input address"
              autoCapitalize="none"
              initialValue=""
              onInputChange={inputChangeHandler}
              email></Input>
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              errorText="Please input a valid input password"
              autoCapitalize="none"
              initialValue=""
              onInputChange={inputChangeHandler}></Input>
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={Colors.primary}></ActivityIndicator>
              ) : (
                <Button
                  title={isSignup ? 'Sign Up' : 'Login'}
                  color={Colors.primary}
                  onPress={authHandler}></Button>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(prev => !prev);
                }}></Button>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Authenticate',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default AuthScreen;
