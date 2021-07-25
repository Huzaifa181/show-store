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
import {MaterialHeaderButtons} from '../../components/UI/HeaderButton';
import {Item} from 'react-navigation-header-buttons';
import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {HeaderTitle} from 'react-navigation-stack';
import ProductItem from '../../components/shop/ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cart';

const ProductOverviewScreen = props => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => <Text>{itemData.item.title}</Text>}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate('ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'All Products',
    headerRight: (
      <MaterialHeaderButtons>
        <Item
          title="Save"
          iconName="favorite"
          onPress={() => {
            navigationData.navigation.navigate('Cart');
          }}
        />
      </MaterialHeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default ProductOverviewScreen;
