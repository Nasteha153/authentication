import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet'
import { limiter } from './middlewares/rateLimiter.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';




import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.js';
import {logger} from './middlewares/logger.js';
import admindRoutes from './routes/admin.js';
import uploadRoutes from './routes/upload.js';
import taskRoutes from './routes/tasks.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(logger); // Use the logger middleware
app.use(helmet()); // Use Helmet for security headers

app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'Authentication API is running', docs: '/docs' });
});
app.use('/auth', authRoutes);
app.use('/admin', admindRoutes); // Use the admin routes for admin-specific endpoints
app.use('/api/upload', uploadRoutes);
app.use('/tasks', taskRoutes); // Use the task routes for task-related endpoints

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(notFound);
app.use(errorHandler);
app.use(limiter);



mongoose.connect(process.env.NODE_ENV === 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server at http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ DB connection error:', err));

  if (process.env.NODE_ENV !== 'production') {
  console.log('👨‍💻 Development mode – logs and debug enabled');
}



 