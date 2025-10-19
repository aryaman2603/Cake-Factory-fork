import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import cartIcon from '../assets/images/cart.png';
import styles from '../styles/Header.module.css';
// 1. IMPORT the useAuthenticator hook
import { useAuthenticator } from '@aws-amplify/ui-react';

const Header = () => {
  const location = useLocation();
  const { itemCount } = useCart();
  // 2. GET the user object and signOut function from Amplify
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>CAKE FACTORY</div>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? styles.active : ''} 
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/shop" 
              className={location.pathname === '/shop' ? styles.active : ''} 
            >
              Shop
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={location.pathname === '/contact' ? styles.active : ''} 
            >
              Contact
            </Link>
          </li>
          
          {/* 3. ADD a conditional block for Login/Logout */}
          {user ? (
            // If user is logged in, show their name and a Sign Out button
            <>
              <li><span className={styles.welcomeMessage}>Hello, {user.username}</span></li>
              <li><button onClick={signOut} className={styles.authButton}>Sign Out</button></li>
            </>
          ) : (
            // If no user, show the Login link
            <li>
              <Link 
                to="/login"
                className={`${styles.authButton} ${location.pathname === '/login' ? styles.active : ''}`} 
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className={styles.cart}>
        <Link to="/cart">
          <img src={cartIcon} alt="Cart" />
          {itemCount > 0 && (
            <span className={styles.cartCount}>{itemCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;