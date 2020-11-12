import React, { useReducer, createContext, useContext } from "react";
import cartItems from "./data";
import Reducer from "./Reducer";

const AppContext = createContext();
const url = 'https://course-api.netlify.app/api/react-useReducer-cart-project';

// Setting up initial state
const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  //   Setting up Events to be dispatched
  // Function to clear the whole cart
  const clearCart = () => {
    return dispatch({ type: "CLEAR_CART" });
  };

  //  Function to remove an item from the cart
  const removeItem = (id) => {
    return dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  //   Function to increase the amount in cart
  const IncreaseProductNumber = (id) => {
      return dispatch({type: 'INCREASE_PRODUCT_NUMBER', payload: id})
  };
  //   Function to Decrease the amount in cart
  const DecreaseProductNumber = (id) => {
      return dispatch({type: 'DECREASE_PRODUCT_NUMBER', payload: id})
  };

//   For monitoring as the amount increases and reduces
React.useEffect(() => {
    dispatch({type: 'GET_TOTALS'})
}, [state.cart])


const fetchData = async() => {
  dispatch({type:'LOADING'})
  const res = await fetch(url);
  const cart = await res.json();
  dispatch({type:'DISPLAY_ITEMS', payload: cart})
}

// For Refactoring
const toggleAmount = (id,type) => {
  dispatch({type:'TOGGLE_AMOUNT',payload:{id, type} })
}

React.useEffect(() => {
    fetchData()
},[])

  return <AppContext.Provider value={{ ...state, clearCart, removeItem,IncreaseProductNumber,DecreaseProductNumber,toggleAmount }}>{children}</AppContext.Provider>;
};


// Custom Hooks
const useElvisContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useElvisContext };
