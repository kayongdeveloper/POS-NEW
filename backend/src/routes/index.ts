import { Router } from 'express';
import authRoutes from './authRoutes.js';
const routers = Router();

routers.use('/auth', authRoutes);

export default routers;

