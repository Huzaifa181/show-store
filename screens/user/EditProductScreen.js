import React, {useEffect, useState, useCallback, useReducer} from 'react';
import {
  ScrollView,
  StyleSheet,
  Alert,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {MaterialHeaderButtons} from '../../components/UI/HeaderButton';
import {Item} from 'react-navigation-header-buttons';
import {Input} from '../../components/UI/Input';
import Colors from '../../constants/colors/Colors';
import {HeaderTitle} from 'react-navigation-stack';
import ProductItem from '../../components/shop/ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import * as productActions from '../../store/actions/products';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

const formReducer = (state, action) => {
  if (action.type === 'FORM_INPUT_UPDATE') {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidaties = {
      ...state.inputValidaties,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidaties) {
      updatedFormIsValid = updatedFormIsValid && updatedValidaties[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidaties: updatedValidaties,
    };
  }
  return state;
};

const EditProductScreen = props => {
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidaties: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId),
  );

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      console.log(!formState.formIsValid);
      Alert.alert('Wrong Input', 'Please check the errors in the form', [
        {
          text: 'Okay',
        },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
        ),
      );
    } else {
      dispatch(
        productActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price,
        ),
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      // setTitle(text);
      dispatchFormState({
        type: 'FORM_INPUT_UPDATE',
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );
  return (
    <KeyboardAvoidingView
      behavior="padding"
      // keyboardVerticalOffset={10}
      style={{flex: 1}}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            label="Title"
            id="title"
            errorText="Please Input a Valid Title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            required
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
          />
          <Input
            label="Image Url"
            id="imageUrl"
            errorText="Please Input a Valid url!"
            keyboardType="default"
            returnKeyType="next"
            required
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
          />
          {editedProduct ? null : (
            <Input
              label="Price"
              id="price"
              errorText="Please Input a Valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0}
            />
          )}
          <Input
            label="Description"
            id="description"
            errorText="Please Input a Valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            onInputChange={inputChangeHandler}
            autoCorrect
            multiline
            numberOfLines={3}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLegth={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = navigationData => {
  const submitFn = navigationData.navigation.getParam('submit');
  return {
    headerTitle: navigationData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: (
      <MaterialHeaderButtons>
        <Item title="Save" iconName="favorite" onPress={submitFn} />
      </MaterialHeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditProductScreen;
