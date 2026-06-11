import {z} from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(3, "Nama kategori wajib diisi").max(100, "Nama kategori tidak boleh lebih dari 100 karakter"),

    description: z.string().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;