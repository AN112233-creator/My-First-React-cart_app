import React, { useState, useContext, createContext, useEffect } from "react";

import carticon from "./assets/images/icons/cart-icon.png";
import searchicon from "./assets/images/icons/search-icon.png";
import amazonlogo from "./assets/images/amazon-logo-white.png";
import amazonmobilelogo from "./assets/images/amazon-mobile-logo-white.png";
import checkmark from "./assets/images/icons/checkmark.png";
import  socks from "./assets/images/products/athletic-cotton-socks-6-pairs.jpg";
import  basketball from "./assets/images/products/intermediate-composite-basketball.jpg";
import  tshirt from "./assets/images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"
import toaster from "./assets/images/products/black-2-slot-toaster.jpg";
import plates from "./assets/images/products/6-piece-white-dinner-plate-set.jpg";
import hoodie from "./assets/images/products/plain-hooded-fleece-sweatshirt-yellow.jpg";
import towel from "./assets/images/products/luxury-tower-set-6-piece.jpg";
import bakeware from "./assets/images/products/6-piece-non-stick-baking-set.webp";
import Cart from "./cart.jsx";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  

  /* const addToCart = (productId) => { 
    setCart((prevCart) => [...prevCart, productId]);

  };
 */
  const formatCurrency = (priceCents) => {
    return (Math.round(priceCents)/100).toFixed(2);
    };

    

  const addToCart = (product, selectedQuantity) => {
    setCart((prevCart) => {
        const existingProduct = prevCart.find((cartItem) => cartItem.id === product.id);

        if (existingProduct) {
            // If the product already exists increase its quantity
            return prevCart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + selectedQuantity } : item
            );
        } else {
            // If the product does not exist add it with quantity selected
            return [...prevCart, { ...product, quantity: selectedQuantity }];
    }
});


};

  const removeFromCart= (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

 

 


  return (
    <CartContext.Provider value={{ cart,setCart, addToCart, removeFromCart, formatCurrency }}>
      {children}
    </CartContext.Provider>
  );
};