const express = require('express');
const cors = require('cors'); 
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');;
const authRoutes= require('./src/routes/authRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const { morganApiFormat, logger } = require('./src/config/logging');
const loggerMiddleware = require('./src/middlewares/loggerMiddleware');
const { swaggerDocs } = require('./src/config/swagger');
const uploadRoutes = require('./src/routes/uploadRoutes');
const categoryRoutes = require('./src/routes/categoryRouter');
dotenv.config();
connectDB();







const app = express();
//Middleware 
app.use(cors()); 

// // Cấu hình Morgan logging
// if (process.env.NODE_ENV === 'production') {
//   // Trong môi trường production, ghi logs vào file
//   app.use(morgan('combined', { stream: accessLogStream }));
// } else {
//   // Trong môi trường development, sử dụng format riêng và hiển thị trên console
//   app.use(morgan('dev'));
//   // Sử dụng format riêng cho API request
//   app.use(morgan(morganApiFormat, { 
//     skip: (req) => req.url.includes('/health') || req.url.includes('/favicon.ico'),
//     stream: logger.stream 
//   }));
// }
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Kiểm tra trạng thái hoạt động của API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API đang hoạt động bình thường
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: UP
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-15T08:15:30Z
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/categories', categoryRoutes);
// Khởi tạo Swagger
swaggerDocs(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});