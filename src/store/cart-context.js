import React, { createContext, useState } from 'react';

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemHandler = (item) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (prevItem) => prevItem.id === item.id
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].amount += item.amount;
        return updatedItems;
      }
      
      // Add new item if it doesn't exist
      return [...prevItems, item];
    });
  };

  const removeItemHandler = (id) => {
    setCartItems((prevItems) => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  const contextValue = {
    items: cartItems,
    totalAmount: cartItems.reduce((sum, item) => sum + item.amount, 0),
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;