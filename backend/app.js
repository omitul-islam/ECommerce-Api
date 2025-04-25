import express from 'express';
import { authRoutes } from './src/auth/auth.route.js';
const app = express();

app.use(express.json());

app.use('/api/auth',authRoutes);

app.get('/',(req, res)=> {
    res.send('Api is working!');
  }
 )

 export default app; 