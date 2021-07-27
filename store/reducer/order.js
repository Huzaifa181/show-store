import PRODUCTS from '../../data/dummy_data';
import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import CartItem from '../../models/cart-item';
import {ADD_ORDER} from '../actions/order';
import Order from '../../models/order';
const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date,
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};
