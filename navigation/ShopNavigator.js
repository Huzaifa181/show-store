import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import {Platform} from 'react-native';
import UserProductScreen from '../screens/user/UserProductsScreen';
import Colors from '../constants/colors/Colors';
import OrderScreen from '../screens/shop/OrderScreen';
import CartScreen from '../screens/shop/CartScreen';
import Icon from 'react-native-ionicons';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Icon name="md-add" size={22} color={drawerConfig.tintColor}></Icon>
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrderScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Icon name="md-add" size={22} color={drawerConfig.tintColor}></Icon>
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Icon name="md-add" size={22} color={drawerConfig.tintColor}></Icon>
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  },
);

export default createAppContainer(ShopNavigator);
