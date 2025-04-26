import express from 'express';
import { createOrder, getOrders } from './order.controller.js';

const route = express.Router();

route.post('/order',createOrder);
route.get('/order',getOrders);

export const orderRoutes = route;