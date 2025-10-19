import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet is a placeholder for your page content
import { AmplifyChatbot } from '@aws-amplify/ui-react';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div>
      {<Header />}
      
      <main>
        {/* Outlet will render the current page (Home, Shop, etc.) */}
        <Outlet /> 
      </main>

      {/* The chatbot will now be part of every page */}
      <AmplifyChatbot
        botName="CakeFactoryAssistant"
        botTitle="Cake Factory Helper"
        welcomeMessage="Hello, how can I help you today?"
      />

      {<Footer />}
    </div>
  );
};

export default Layout;