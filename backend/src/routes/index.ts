import { Router } from 'express';
import authRoutes from './authRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import productRoutes from './productRoutes.js'
const routers = Router();

routers.use('/auth', authRoutes);
routers.use('/categories', categoryRoutes);
routers.use('/products', productRoutes )

export default routers;

