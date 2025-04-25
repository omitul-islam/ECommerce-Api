import express from 'express';
import { authRoutes } from './src/auth/auth.route.js';
import { productRoutes } from './src/product/product.route.js';
import { authenticateUser } from './src/utils/jwtUtils.js';
import { isAdmin } from './src/utils/isAdmin.js';
const app = express();

app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api',authenticateUser, isAdmin,productRoutes);

app.get('/',(req, res)=> {
    res.send('Api is working!');
  }
 )

 export default app; 