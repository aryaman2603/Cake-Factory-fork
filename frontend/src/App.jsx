import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login'; // new login/signup page

import './styles/globals.css';

// Configure Amplify
Amplify.configure(awsExports);

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
