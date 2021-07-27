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
import Colors from '../../constants/colors/Colors';
import {HeaderTitle} from 'react-navigation-stack';
import ProductItem from '../../components/shop/ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';

const ProductOverviewScreen = props => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.availableProducts);

  useEffect(() => {
    dispatch(productActions.fetchProducts());
  }, [dispatch]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('Product Detail', {
      productId: id,
      productTitle: title,
    });
  };
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() =>
            selectItemHandler(itemData.item.id, itemData.item.title)
          }>
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)
            }
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
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

const styles = StyleSheet.create({});

export default ProductOverviewScreen;
