import { createCategorySchema, type CreateCategoryInput } from "../validation/categoryValidation.js";
import { prisma } from "../libs/prisma.js";
import { buildPaginationAndFilter } from '../utils/prisma-query.util.js'
import { sendPaginatedResponse } from "../utils/response.util.js";

export class CategoryService {
    async getAllCategories(params: { page?: number; limit?: number, search?: string }) {

        const { where, skip, take, limit, page, } = buildPaginationAndFilter(params, {
            searchFields: ['name']
        })
        const [data, total] = await Promise.all([
            prisma.category.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: "desc" }
            }),
            prisma.category.count({
                where,
            })
        ]);

        return sendPaginatedResponse({
            data,
            total,
            page,
            limit,
            message: "get data Categories successfully "
        })
    }

    // get category by id
    async getCategoryById(id: number) {
        const data = await prisma.category.findUnique({
            where: { id }
        });
        if (!data) {
            throw new Error("Kategori tidak ditemukan");
        }
        return {
            status: "success",
            message: `Kategori berhasil diambil dengan id ${id}`,
            data
        };

    }


    async createCategory(data: CreateCategoryInput) {
        const validatedData = createCategorySchema.parse(data);

        const category = await prisma.category.create({
            data: {
                name: validatedData.name,
            }
        });

        return category;

    }


    async updateCategory(id: number, data: Partial<CreateCategoryInput>) {
        const existingCategory = await prisma.category.findUnique({
            where: { id }
        });



        if (!existingCategory) {
            throw new Error("Kategori tidak ditemukan");
        }

        const updatedCategory = await prisma.category.update({
            where: { id },
            data
        });

        return updatedCategory;
    }

    async deleteCategory(id: number) {
        const existingCategory = await prisma.category.findUnique({
            where: { id, deletedAt: null }
        });

        if (!existingCategory) {
            throw new Error("Kategori tidak ditemukan");
        }
        await prisma.category.update({
            where: { id },
            data: { deletedAt: new Date() }
        });

        return {
            status: "success",
            message: `Kategori dengan id ${id} berhasil dihapus`

        };

    }
}