import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  getCurrentUser
} from 'aws-amplify/auth';

const Login = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  const handleSignUp = async () => {
    try {
      await signUp({
        username,
        password,
        options: { userAttributes: { email } },
      });
      alert('Signup successful! Check your email for a confirmation code.');
      setStage('confirm');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleConfirmSignUp = async () => {
    const code = prompt('Enter the code sent to your email:');
    try {
      await confirmSignUp({ username, confirmationCode: code });
      alert('Confirmed successfully! You can now log in.');
      setStage('login');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const loggedUser = await signIn({ username, password });
      setUser(await getCurrentUser());
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      alert('Signed out!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem', fontFamily: 'sans-serif' }}>
      <h1>AWS Cognito Login</h1>

      {!user ? (
        <>
          {stage === 'signup' && (
            <div>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              /><br />
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /><br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /><br />
              <button onClick={handleSignUp}>Sign Up</button>
              <p>
                Already have an account?{' '}
                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setStage('login')}>
                  Log In
                </span>
              </p>
            </div>
          )}

          {stage === 'login' && (
            <div>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              /><br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /><br />
              <button onClick={handleSignIn}>Login</button>
              <p>
                Don’t have an account?{' '}
                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setStage('signup')}>
                  Sign Up
                </span>
              </p>
            </div>
          )}

          {stage === 'confirm' && (
            <div>
              <h3>Confirm your signup</h3>
              <button onClick={handleConfirmSignUp}>Enter confirmation code</button>
            </div>
          )}
        </>
      ) : (
        <div>
          <h3>Welcome, {user.username} 🎉</h3>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default Login;
