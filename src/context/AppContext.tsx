import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Course, CartItem, FilterState } from '../types/course';

interface AppState {
  courses: Course[];
  cart: CartItem[];
  favorites: string[];
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  filters: FilterState;
  searchQuery: string;
}

type AppAction = 
  | { type: 'SET_COURSES'; payload: Course[] }
  | { type: 'ADD_TO_CART'; payload: Course }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_FAVORITES'; payload: string }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'SET_USER'; payload: AppState['user'] }
  | { type: 'SET_FILTERS'; payload: FilterState }
  | { type: 'SET_SEARCH_QUERY'; payload: string };

const initialState: AppState = {
  courses: [],
  cart: [],
  favorites: [],
  user: null,
  filters: {
    bidangStudi: [],
    harga: [],
    durasi: []
  },
  searchQuery: ''
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_COURSES':
      return { ...state, courses: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_CART_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload.id)
        };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload)
      };
    
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Custom hooks untuk kemudahan penggunaan
export const useCart = () => {
  const { state, dispatch } = useAppContext();

  const addToCart = (course: Course) => {
    dispatch({ type: 'ADD_TO_CART', payload: course });
  };

  const removeFromCart = (courseId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: courseId });
  };

  const updateQuantity = (courseId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: courseId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => total + (item.price.current * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (courseId: string) => {
    return state.cart.some(item => item.id === courseId);
  };

  return {
    cartItems: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isInCart
  };
};

export const useFavorites = () => {
  const { state, dispatch } = useAppContext();

  const addToFavorites = (courseId: string) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: courseId });
  };

  const removeFromFavorites = (courseId: string) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: courseId });
  };

  const isFavorite = (courseId: string) => {
    return state.favorites.includes(courseId);
  };

  return {
    favorites: state.favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};
