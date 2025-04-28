import express from 'express';
import { getUser } from './user.controller.js';

const route = express.Router();

route.get('/profile',getUser);

export const userRoute = route;