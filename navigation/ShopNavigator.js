import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {DrawerItems} from 'react-navigation-drawer';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import {Platform, SafeAreaView, View, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {createSwitchNavigator} from 'react-navigation';
import * as authActions from '../store/actions/auth';
import UserProductScreen from '../screens/user/UserProductsScreen';
import Colors from '../constants/colors/Colors';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
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
    EditProduct: EditProductScreen,
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
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
            <DrawerItems {...props}></DrawerItems>
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate('Auth');
              }}></Button>
          </SafeAreaView>
        </View>
      );
    },
  },
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  },
);
const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
