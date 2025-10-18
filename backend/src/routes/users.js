import express from 'express';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configure AWS SDK
// The SDK will automatically use the credentials from your .env file
AWS.config.update({ region: process.env.AWS_REGION });
const cognito = new AWS.CognitoIdentityServiceProvider();

// User Registration Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required.' });
  }

  const params = {
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  try {
    await cognito.signUp(params).promise();
    res.status(201).json({ message: 'User registered successfully! Please check your email to confirm your account.' });
  } catch (error) {
    console.error('Cognito Sign-Up Error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }
  
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_APP_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };
  
    try {
      const data = await cognito.initiateAuth(params).promise();
      // Send the token back to the client
      res.json({ token: data.AuthenticationResult.IdToken });
    } catch (error) {
      console.error('Cognito Sign-In Error:', error);
      res.status(401).json({ error: error.message || 'Invalid credentials' });
    }
  });
  
export default router;