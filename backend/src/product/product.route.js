import express from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from './product.controller.js';

const route = express.Router();

route.post('/products',createProduct); 
route.get('/products',getAllProducts);
route.put('/products/:id',updateProduct);
route.delete('/products/:id',deleteProduct);

export const productRoutes = route;