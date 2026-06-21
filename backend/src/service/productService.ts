import { prisma } from '../libs/prisma.js';
import {buildPaginationAndFilter} from '../utils/prisma-query.util.js'
import { createProductSchema, type CreateProductInput } from '../validation/productValidation.js';
import { sendPaginatedResponse } from "../utils/response.util.js";




export class ProductService {

    async getAllProducts(params: { page?: number; limit?: number, search?: string }) {
        

     const {where, skip, take,  page, limit} =buildPaginationAndFilter(params, {
        searchFields:['name', 'description'], 
        relationSearch:{ category: ['name'] }
     });

        const [data, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take, 
                orderBy: { createdAt: "desc" },
                include: {
                    category: true,
                }
            }),
            prisma.product.count({
                where
            })
        ]);

       return sendPaginatedResponse({
        data,
        total,
        page,
        limit,
        message: "Produk berhasil diambil"
    });
    }


    async getCategoryById(id: number) {
        const data = await prisma.product.findUnique({
            where: { id , deleteAt: null},
        });
        if (!data) {
            throw new Error("Produk tidak ditemukan");
        }
        return {
            status: "success",
            message: `Produk berhasil diambil dengan id ${id}`,
            data
        };

    }




};