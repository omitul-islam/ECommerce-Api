import express from 'express';
import { addToCart, getCart, updateCart } from './cart.controller.js';

const route = express.Router();

route.post('/item',addToCart);
route.get('/item',getCart);
route.put('/item/:id',updateCart);

export const cartRoutes = route;