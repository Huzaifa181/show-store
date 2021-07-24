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
import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {HeaderTitle} from 'react-navigation-stack';
import {useSelector} from 'react-redux';

const ProductOverviewScreen = () => {
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => <Text>{itemData.item.title}</Text>}
    />
  );
};
ProductOverviewScreen.navigationOptions = {
  headerTitle: 'All Products!',
};
const styles = StyleSheet.create({});

export default ProductOverviewScreen;
