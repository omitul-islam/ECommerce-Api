import express from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from './product.controller.js';
import { upload } from '../multer.js';
import { authenticateUser } from '../utils/jwtUtils.js';
import { isAdmin } from '../utils/isAdmin.js';

const route = express.Router();

route.post('/products',authenticateUser,isAdmin,upload.single('image'),createProduct); 
route.get('/products',getAllProducts);
route.put('/products/:id',authenticateUser,isAdmin,upload.single('image'),updateProduct)                 ;
route.delete('/products/:id',authenticateUser,isAdmin,deleteProduct);

export const productRoutes = route;