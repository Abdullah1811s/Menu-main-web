import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { connectDB } from './db/connectDatabase.js';
import authRoutes from './routes/authRoute.js'
import affiliateRoutes from './routes/affiliateRoute.js'
import wheelRoutes from './routes/wheelRoute.js'
import vendorRoutes from './routes/vendorroute.js'
import memberShipRoute from './routes/membershipRoute.js'
import uploadRoute from './routes/cloudinaryRoute.js'
import paymentRoute from './routes/paymentRoutes.js'
const app = express();
app.use(express.json());
app.use(cookieParser());
const FRONTEND_URL = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: [FRONTEND_URL],
    credentials: true
}));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/affiliate', affiliateRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/wheel', wheelRoutes);
app.use('/api/membership', memberShipRoute);
app.use('/api/membership', memberShipRoute);
app.use('/api/generateSignature', uploadRoute);
app.use('/api/create-checkout', paymentRoute);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
