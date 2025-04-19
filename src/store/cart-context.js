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
      const existingItemIndex = prevItems.findIndex(
        (prevItem) => prevItem.id === item.id
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].amount += item.amount;
        return updatedItems;
      }
      
      return [...prevItems, item];
    });
  };

  const removeItemHandler = (id) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === id);
      if (!existingItem) return prevItems;
      
      if (existingItem.amount === 1) {
        return prevItems.filter(item => item.id !== id);
      }
      
      return prevItems.map(item => 
        item.id === id ? {...item, amount: item.amount - 1} : item
      );
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