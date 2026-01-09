const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://taianh2212.github.io',
    'https://love-lqv.vercel.app',
    /\.vercel\.app$/ // Allow all Vercel preview deployments
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // Tăng limit cho upload ảnh
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  Server will continue without MongoDB - data will not persist');
  });

// Routes
const partnersRouter = require('./routes/partners');
const authRouter = require('./routes/auth');
const uploadRouter = require('./routes/upload');
app.use('/api/partners', partnersRouter);
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ message: '💕 Love Manager API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/partners`);
});
