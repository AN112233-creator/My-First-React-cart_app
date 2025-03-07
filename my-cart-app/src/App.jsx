import { useState } from 'react'
import Product from './products'
import { Link } from 'react-router-dom'
import { Routes, Route, Router } from 'react-router-dom'
import { CartProvider } from './CartContext'
import Cart from './cart'
import Products from './products'




/* function App() {
 

  return (
    <Routes>
    <Route path="/" element={<Product />} />
    <Route path="/cart" element={<Cart />} />
   </Routes> 

   

  )
}

export default App
 */

const App = () => {
  return (
    <CartProvider>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
     
    </CartProvider>
  );
};

export default App;