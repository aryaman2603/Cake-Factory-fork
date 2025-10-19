import React, { useEffect } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';

const Login = () => {
  const { route } = useAuthenticator((context) => [context.route]);
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is already authenticated, redirect them to the homepage
    if (route === 'authenticated') {
      navigate('/');
    }
  }, [route, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Authenticator />
    </div>
  );
};

export default Login;