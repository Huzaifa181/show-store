import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  FlatList,
  Text,
  Button,
} from 'react-native';
import productReducer from './store/reducer/products';
import cartReducer from './store/reducer/cart';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ShopNavigator from './navigation/ShopNavigator';
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});
const store = createStore(rootReducer);
const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
