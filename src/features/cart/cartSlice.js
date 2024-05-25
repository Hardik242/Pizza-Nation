import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = newItem
      state.cart.push(action.payload);
      // state.isIncart.push(action.payload.pizzaId);
    },
    deleteItem(state, action) {
      //payload = ID for item
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
      // state.isIncart = state.isIncart.filter(
      //   (item) => item.pizzaId !== action.payload
      // );
    },
    incItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  incItemQuantity,
  decItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getIsInCartStatus = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id) ? true : false;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getQuantity = (id) => (state) => {
  const item = state.cart.cart.find((item) => item.pizzaId === id);
  return item.quantity;
};
