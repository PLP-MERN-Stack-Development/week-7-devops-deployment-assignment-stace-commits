require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy' });
});

const Sentry = require('@sentry/node');

Sentry.init({ dsn: process.env.SENTRY_DSN });

// Sentry will still capture unhandled exceptions and rejections
// You can also manually capture errors:
app.use((err, req, res, next) => {
  Sentry.captureException(err);
  next(err);
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


// Sentry error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
