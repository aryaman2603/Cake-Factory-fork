import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import chatbotRoutes from './routes/chatbot.js';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chatbot', chatbotRoutes);
export default app;