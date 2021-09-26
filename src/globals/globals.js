export const DispatchCommands = {
  LOGIN: 'LOGIN',
  START_LOADER: 'START_LOADER',
  STOP_LOADER: 'STOP_LOADER',
  STORE_ALL_PRODUCTS: 'STORE_ALL_PRODUCTS',
  STORE_MORE_PRODUCTS: 'STORE_MORE_PRODUCTS',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  GET_SINGLE_PRODUCT: 'GET_SINGLE_PRODUCT',
  CLEAR_UNSEEN_CART_COUNT: 'CLEAR_UNSEEN_CART_COUNT',
};

export const SagaCommands = {
  LOGIN: 'LOGIN',
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  FETCH_MORE_PRODUCTS: 'FETCH_MORE_PRODUCTS',
};

export const ProductPostTypes = {
  CART: 'CART',
  FEED: 'FEED',
};

export const globalTheme = {
  light: {
    primary: 'tomato',
    background: 'white',
    button: 'tomato',
    text: 'black',
    badge_text: 'white',
  },
  dark: {
    primary: '#ffbf00',
    background: 'grey',
    button: '#ffbf00',
    text: 'white',
    badge_text: 'black',
  },
};
