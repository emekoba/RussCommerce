import {
  AuthStates,
  DispatchCommands,
  ProductPostTypes,
  ThemeStates,
} from '../globals/globals';

const globalState = {
  authState: AuthStates.LOGIN,

  appName: 'russcommerce',

  themeState: ThemeStates.LIGHT,

  userLoggedIn: true,

  user: {id: 'BBUV4DYwsD1RAQeDCG6t'},

  cart: {unseen: 0, items: []},

  russell: [
    // category: 'electronics',
    // description:
    //   'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)',
    // id: 10,
    // image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
    // price: 109,
    // rating: {count: 470, rate: 2.9},
    // title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
    // inCart: true,
    {
      category: "men's clothing",
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      id: 1,
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      price: 109.95,
      rating: {count: 120, rate: 3.9},
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    },
    {
      category: "men's clothing",
      description:
        'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
      id: 2,
      image:
        'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      price: 22.3,
      rating: {count: '259', rate: 4.1},
      title: 'Mens Casual Premium Slim Fit T-Shirts ',
    },
    {
      category: "men's clothing",
      description:
        'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
      id: 3,
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      price: 55.99,
      rating: {count: 500, rate: 4.7},
      title: 'Mens Cotton Jacket',
    },
    {
      category: "men's clothing",
      description:
        'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
      id: 4,
      image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      price: 15.99,
      rating: {count: 430, rate: 2.1},
      title: 'Mens Casual Slim Fit',
    },
    {
      category: 'jewelery',
      description:
        "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      id: 5,
      image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
      price: 695,
      rating: {count: 400, rate: 4.6},
      title:
        "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    },
    {
      category: 'jewelery',
      description:
        'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
      id: 6,
      image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
      price: 168,
      rating: {count: 70, rate: 3.9},
      title: 'Solid Gold Petite Micropave ',
    },
    {
      category: 'jewelery',
      description:
        "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
      id: 7,
      image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
      price: 9.99,
      rating: {count: 400, rate: 3},
      title: 'White Gold Plated Princess',
    },
    {
      category: 'jewelery',
      description:
        'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel',
      id: 8,
      image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
      price: 10.99,
      rating: {count: 100, rate: 1.9},
      title: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
    },
    {
      category: 'electronics',
      description:
        'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system',
      id: 9,
      image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
      price: 64,
      rating: {count: 203, rate: 3.3},
      title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0 ',
    },
    {
      category: 'electronics',
      description:
        'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)',
      id: 10,
      image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
      price: 109,
      rating: {count: 470, rate: 2.9},
      title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
    },
  ],

  productList: {},

  productCategories: {},

  productPreview: {},

  loader: {
    isLoading: false,
  },
};

export default function reducer(state = globalState, {type, payload}) {
  switch (type) {
    case DispatchCommands.LOGIN:
      return {
        ...state,
        user: payload,
        userLoggedIn: true,
      };

    case DispatchCommands.LOGOUT:
      return {
        ...state,
        userLoggedIn: false,
      };

    case DispatchCommands.START_LOADER:
      return {...state, loader: {...state.loader, isLoading: true}};

    case DispatchCommands.CHANGE_AUTH_STATE:
      return {...state, authState: payload};

    case DispatchCommands.TOGGLE_AUTH_STATE:
      return {
        ...state,
        authState:
          state.authState === AuthStates.LOGIN
            ? AuthStates.REGISTER
            : AuthStates.LOGIN,
      };

    case DispatchCommands.STOP_LOADER:
      return {...state, loader: {...state.loader, isLoading: false}};

    case DispatchCommands.STORE_ALL_PRODUCTS:
      const pro_obj = {};

      payload.products.map(e => {
        pro_obj[e.id] = e;
        pro_obj[e.id]['inCart'] = false;
      });

      return {
        ...state,
        productList: pro_obj,
        productCategories: payload.categories,
      };

    case DispatchCommands.STORE_MORE_PRODUCTS:
      return {...state, productList: payload};

    case DispatchCommands.ADD_TO_CART:
      return {
        ...state,
        productList: {
          ...state.productList,
          [`${payload.id}`]: {
            ...state.productList[payload.id],
            inCart: true,
          },
        },
        cart: {
          ...state.cart,
          unseen: state.cart.unseen + 1,
          items: [...state.cart.items, payload.id],
        },
        ...(payload.type === ProductPostTypes.PREVIEW
          ? {productPreview: {...state.productPreview, inCart: true}}
          : {}),
      };

    case DispatchCommands.REMOVE_FROM_CART:
      return {
        ...state,
        productList: {
          ...state.productList,
          [`${payload.id}`]: {
            ...state.productList[payload.id],
            inCart: false,
          },
        },
        cart: {
          ...state.cart,
          items: state.cart.items.filter(e => e !== payload.id),
        },
        ...(payload.type === ProductPostTypes.PREVIEW
          ? {productPreview: {...state.productPreview, inCart: false}}
          : {}),
      };

    case DispatchCommands.GET_SINGLE_PRODUCT:
      return {
        ...state,
        productPreview: state.productList[payload],
      };

    case DispatchCommands.CLEAR_UNSEEN_CART_COUNT:
      return {
        ...state,
        cart: {...state.cart, unseen: 0},
      };

    case DispatchCommands.TOGGLE_ACTIVE_CATEGORY:
      return {
        ...state,
        productCategories: {
          ...state.productCategories,
          [`${payload}`]: !state.productCategories[payload],
        },
      };

    case DispatchCommands.UPDATE_PAST_USER_ACTIVITY:
      return {
        ...state,
        productCategories: payload.productCategories,
        cart: payload.cart,
        productList: payload.productList,
      };

    default:
      return state;
  }
}
