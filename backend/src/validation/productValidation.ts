import {z} from 'zod';


export const createProductSchema = z.object({
    name: z.string().min(3, "Nama produk wajib diisi").max(50, "Nama produk` tidak boleh lebih dari 50 karakter"),
    description: z.string().min(10, "Deskripsi produk wajib diisi").max(500, "Deskripsi produk tidak boleh lebih dari 500 karakter"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;