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
import orderReducer from './store/reducer/order';
import authReducer from './store/reducer/auth';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ShopNavigator from './navigation/ShopNavigator';
import ReduxThunk from 'redux-thunk';
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
