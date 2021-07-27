import React, {useReducer, useEffect} from 'react';
import Colors from '../../constants/colors/Colors';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {HeaderButton, HeaderButtons} from 'react-navigation-header-buttons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {style} from 'styled-system';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        touched: false,
      };
    case 'INPUT_BLUR':
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

export const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false,
  });

  const {onInputChange, id} = props;
  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChanegHandler = text => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({type: 'INPUT_CHANGE', value: text, isValid: isValid});
  };

  const lostFocusHandler = () => {
    dispatch({type: 'INPUT_BLUR'});
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onBlur={lostFocusHandler}
        onChangeText={textChanegHandler}></TextInput>
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  formControls: {
    width: '100%',
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  errorContainer: {
    margin: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});
