import PRODUCTS from '../../data/dummy_data';
import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import CartItem from '../../models/cart-item';
const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  }
  return state;
};
