import express from 'express';
import { deleteOrder, deleteUser, getOrders, getUserById, getUsers, updateOrders, updateUser } from './admin.controller.js';
const route = express.Router();


route.delete('/users/:id',deleteUser);
route.get('/users',getUsers)
route.get('/users/:id',getUserById)
route.put('/users/:id',updateUser);


route.get('/order',getOrders);
route.patch('/order/:id',updateOrders);
route.delete('/order/:id',deleteOrder);

export const adminRoutes = route;