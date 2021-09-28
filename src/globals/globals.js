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
  LOAD_USER_DATA: 'LOAD_USER_DATA',
  CHANGE_AUTH_STATE: 'CHANGE_AUTH_STATE',
  TOGGLE_AUTH_STATE: 'TOGGLE_AUTH_STATE',
  TOGGLE_ACTIVE_CATEGORY: 'TOGGLE_ACTIVE_CATEGORY',
  UPDATE_PAST_USER_ACTIVITY: 'UPDATE_PAST_USER_ACTIVITY',
  TOGGLE_THEME_STATE: 'TOGGLE_THEME_STATE',
};

export const SagaCommands = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  FETCH_MORE_PRODUCTS: 'FETCH_MORE_PRODUCTS',
};

export const ProductPostTypes = {
  CART: 'CART',
  FEED: 'FEED',
  PREVIEW: 'PREVIEW',
};

export const AuthStates = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
};

export const ThemeStates = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const globalTheme = {
  light: {
    primary: 'tomato',
    secondary: 'wheat',
    background: 'white',
    button: 'tomato',
    text: 'black',
    contrast_text: 'black',
    badge_text: 'white',
  },
  dark: {
    primary: '#ffbf00',
    secondary: 'wheat',
    background: 'grey',
    button: '#ffbf00',
    text: 'white',
    contrast_text: 'white',
    badge_text: 'black',
  },
};

export function generateId(length) {
  if (!length) {
    length = 20;
  }

  let result = '';

  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
