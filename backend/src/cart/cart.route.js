import express from 'express';
import { addToCart, clearCart, getCart, updateCart } from './cart.controller.js';

const route = express.Router();

route.post('/item/:id',addToCart);
route.get('/item',getCart);
route.put('/item/:id',updateCart);
route.delete('/item',clearCart);

export const cartRoutes = route;