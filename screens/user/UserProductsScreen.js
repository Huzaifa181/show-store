import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
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
import * as productActions from '../../store/actions/products';

const UserProductScreen = props => {
  const dispatch = useDispatch();
  const userProducts = useSelector(state => state.products.userProducts);
  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', {
      productId: id,
    });
  };
  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        },
      },
    ]);
  };
  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No product found, May be start creating some?</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}>
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => deleteHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Your Products',
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
    headerRight: (
      <MaterialHeaderButtons>
        <Item
          title="Save"
          iconName="favorite"
          onPress={() => {
            navigationData.navigation.navigate('EditProduct');
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

export default UserProductScreen;
