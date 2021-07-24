import React from 'react';
import {View, Text, Image, StyleSheet, Button, ScrollView} from 'react-native';
import Colors from '../../constants/colors/Colors';
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cart';

const ProductDetail = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId),
  );
  console.log(selectedProduct);
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{uri: selectedProduct.imageUrl}}></Image>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add To Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}></Button>
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};
ProductDetail.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
});

export default ProductDetail;
