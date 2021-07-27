export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
  return async dispatch => {
    const date = new Date();
    const response = await fetch(
      `https://show-store-4ff65-default-rtdb.firebaseio.com/orders/u1.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Something went Wroong');
    }
    const resdata = response.json();
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resdata.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
