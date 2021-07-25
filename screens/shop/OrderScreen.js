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
  Platform,
  Text,
  Button,
} from 'react-native';
import Colors from '../../constants/colors/Colors';
import {HeaderTitle} from 'react-navigation-stack';
import ProductItem from '../../components/shop/ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';
import {Item} from 'react-navigation-header-buttons';
import {MaterialHeaderButtons} from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
const OrderScreen = props => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.date.toDateString()}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrderScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Orders',
    headerLeft: (
      <MaterialHeaderButtons>
        <Item
          title="Save"
          iconName="favorite"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </MaterialHeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    padding: 10,
  },
  summaryText: {
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default OrderScreen;
