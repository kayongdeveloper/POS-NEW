import type { Request, Response } from 'express';
import { ProductService } from '../service/productService.js';
import { ZodError } from 'zod';


const productService = new ProductService();

export class ProductController {

    getAllProduct = async(req:Request, res:Response):Promise<void> =>{
        try {
            const result = await productService.getAllProducts(req.query);
            res.status(200).json({
                ...result
            })
        } catch (error:any) {
            res.status(500).json({
                status:"error", 
                message:error.message || 'terjadi kesalahan server'
            })
            
        }
    }
}

