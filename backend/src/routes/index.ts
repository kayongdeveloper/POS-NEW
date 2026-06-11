import { Router } from 'express';
import authRoutes from './authRoutes.js';
import categoryRoutes from './categoryRoutes.js';
const routers = Router();

routers.use('/auth', authRoutes);
routers.use('/categories', categoryRoutes);

export default routers;

