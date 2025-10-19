import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Amplify } from 'aws-amplify';
// Components & Pages
import Layout from './components/Layout'; // Import the new Layout
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login'; // Import the new Login page

// Styles
import './styles/globals.css';

// Your Amplify Configuration
Amplify.configure({
  Auth: {
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_APP_CLIENT_ID,
    region: 'ap-south-1' 
  },
  Interactions: {
    bots: {
      "CakeFactoryAssistant": {
        "name": "CakeFactoryAssistant",
        "alias": "$LATEST",
        "region": "ap-southeast-1", 
      },
    }
  }
});

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          {/* All routes inside Layout will have the chatbot */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product/:id" element={<ProductDetail />} />
          </Route>
          
          {/* The login route is separate, without the chatbot */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;