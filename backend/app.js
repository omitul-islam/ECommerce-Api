import express from 'express';
import { authRoutes } from './src/auth/auth.route.js';
import { productRoutes } from './src/product/product.route.js';
import { authenticateUser } from './src/utils/jwtUtils.js';
import { isAdmin } from './src/utils/isAdmin.js';
import { cartRoutes } from './src/cart/cart.route.js';
import { orderRoutes } from './src/order/order.route.js';
import { adminRoutes } from './src/admin/admin.route.js';
import cors from 'cors';
import path from 'path';
import { userRoute } from './src/user/user.route.js';

const app = express();
app.use(express.json());
const uploadsPath = path.resolve('src/uploads');
app.use('/uploads', express.static(uploadsPath));


app.use(cors({
  origin: true,
  credentials:true,
}))

app.use('/api/user',authenticateUser,userRoute);
app.use('/api/auth',authRoutes);
app.use('/api',productRoutes);
app.use('/api/v1',authenticateUser,orderRoutes);
app.use('/api/cart',authenticateUser,cartRoutes);
app.use('/api/admin',authenticateUser, isAdmin,adminRoutes);
app.use('/api/admin/v1',authenticateUser, isAdmin,adminRoutes);

app.get('/',(req, res)=> {
    res.send('Api is working!');
  }
 )

 export default app; 