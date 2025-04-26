import express from 'express';
import { deleteUser, getUserById, getUsers, updateUser } from './admin.controller.js';
const route = express.Router();


route.delete('/users/:id',deleteUser);
route.get('/users',getUsers)
route.get('/users/:id',getUserById)
route.put('/users/:id',updateUser);

export const adminRoutes = route;