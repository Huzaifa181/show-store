import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';

import Colors from '../../constants/colors/Colors';
import {useSelector} from 'react-redux';

const ProductDetail = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId),
  );
  return (
    <View style={styles.product}>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};
ProductDetail.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({});

export default ProductDetail;
