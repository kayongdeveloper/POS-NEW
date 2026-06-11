import { createCategorySchema, type CreateCategoryInput } from "../validation/categoryValidation.js";
import { prisma } from "../lib/prisma.js";









export class CategoryService {

    async getAllCategories(params: { page?: number; limit?: number, search?: string }) {
        const { page = 1, limit = 10, search } = params;
        const skip = (page - 1) * limit;
        const whereClause = search
            ? {
                name: {
                    contains: search,
                    mode: "insensitive" as const,
                },
            }
            : {};
        const [data, total] = await Promise.all([
            prisma.category.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" }
            }),
            prisma.category.count({
                where: whereClause,
            })
        ]);

        return {
            status: "success",
            message: "Kategori berhasil diambil",
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                nextPage: page < Math.ceil(total / limit) ? page + 1 : null,
                prevPage: page > 1 ? page - 1 : null,
            },
            data,

        };
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
                description: validatedData.description
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

        }
       
    }
    

}