import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from AsyncStorage when the app starts
  const loadCartItems = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('@cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart)); // Set the cart state from AsyncStorage data
      }
    } catch (error) {
      console.error('Error loading cart from AsyncStorage:', error);
    }
  };

  // Save cart items to AsyncStorage whenever cart changes
  const saveCartItems = async (items) => {
    try {
      await AsyncStorage.setItem('@cartItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to AsyncStorage:', error);
    }
  };

  // Add or update item in the cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((cartItem) => cartItem.id === item.id);
      const updatedItems = itemExists
        ? prevItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prevItems, { ...item, quantity: 1 }];
      
      saveCartItems(updatedItems); // Save updated cart to AsyncStorage
      return updatedItems;
    });
  };

  // Decrease quantity or remove item from the cart
  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0); // Remove item if quantity is 0

      saveCartItems(updatedItems); // Save updated cart to AsyncStorage
      return updatedItems;
    });
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]); // Set cart items to an empty array
    AsyncStorage.removeItem('@cartItems'); // Remove cart from AsyncStorage
  };

  // Load cart items when the component mounts
  useEffect(() => {
    loadCartItems();
  }, []); // Run once when the component is mounted

  return (
    <CartContext.Provider value={{ cartItems, addToCart, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
