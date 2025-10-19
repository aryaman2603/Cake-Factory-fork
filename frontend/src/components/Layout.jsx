import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet is a placeholder for your page content
import { AmplifyChatbot } from '@aws-amplify/ui-react';

const Layout = () => {
  return (
    <div>
      {/* Your Navbar would go here if you have one */}
      
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

      {/* Your Footer would go here */}
    </div>
  );
};

export default Layout;