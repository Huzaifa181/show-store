import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  ActivityIndicator,
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
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.availableProducts);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts,
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);
  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch.loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('Product Detail', {
      productId: id,
      productTitle: title,
    });
  };
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An Error Occured!</Text>
        <Button
          title="Try Again"
          onPress={loadProducts}
          color={Colors.primary}></Button>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}></ActivityIndicator>
      </View>
    );
  }
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No product found. May be start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductOverviewScreen;
