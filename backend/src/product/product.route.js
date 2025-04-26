import express from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from './product.controller.js';
import { upload } from '../multer.js';

const route = express.Router();

route.post('/products',upload.single('image'),createProduct); 
route.get('/products',getAllProducts);
route.put('/products/:id',upload.single('image'),updateProduct);
route.delete('/products/:id',deleteProduct);

export const productRoutes = route;