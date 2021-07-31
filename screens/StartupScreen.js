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
  AsyncStorage,
  KeyboardAvoidingView,
  View,
  FlatList,
  Text,
  Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MaterialHeaderButtons} from '../components/UI/HeaderButton';
import {Item} from 'react-navigation-header-buttons';

import Colors from '../constants/colors/Colors';

import {HeaderTitle} from 'react-navigation-stack';
import ProductItem from '../components/shop/ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import {Input} from '../components/UI/Input';
import * as authActions from '../store/actions/auth';

const StartupScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      const {token, userId, expiryDate} = transformedData;

      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();
      props.navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, [dispatch]);

  const expirationTime = expirationDate.getTime() - new Date().getTime();

  return (
    <View style={styles.screen}>
      <ActivityIndicator
        size="large"
        color={Colors.primary}></ActivityIndicator>
    </View>
  );
};

StartupScreen.navigationOptions = navigationData => {
  return {
    // headerTitle: 'Authenticate',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
