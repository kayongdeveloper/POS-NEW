import type { Request, Response } from 'express';
import { CategoryService } from '../service/categoryService.js';
import { ZodError } from 'zod';

interface CategoryParams {
    id: string;
}


const categoryService = new CategoryService();

export class CategoryController {

    getAllCategories = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await categoryService.getAllCategories(req.query);
            res.status(200).json({
                ...result
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message || "Terjadi kesalahan server"
            });
        }
    }

    getById = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const categoryId = Number(id);

            if (isNaN(categoryId)) {
                res.status(400).json({
                    status: "fail",
                    message: "ID harus berupa angka"
                });
                return;
            }

            const result = await categoryService.getCategoryById(categoryId);

            res.status(200).json(result);
        } catch (error: any) {
            res.status(404).json({
                status: "fail",
                message: error.message
            });
        }
    };


    // create category
    createCategory = async (req: Request, res: Response): Promise<void> => {
        try {
            const category = await categoryService.createCategory(req.body);
            res.status(201).json({
                status: "success",
                message: "Kategori berhasil dibuat",
                data: category
            });
        } catch (error: any) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    message: "Validasi gagal",
                    errors: error.issues.map(err => ({
                        field: err.path[0],
                        message: err.message
                    }))
                });
                return;
            }
            res.status(500).json({
                status: "error",
                message: error.message || "Terjadi kesalahan server"
            });
        }
    };


    // update category
    updateCategory = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const categoryId = Number(id);
            if (isNaN(categoryId)) {
                res.status(400).json({
                    status: "fail",
                    message: "ID harus berupa angka"
                });
                return;
            }
            const updatedCategory = await categoryService.updateCategory(categoryId, req.body);
            res.status(200).json({
                status: "success",
                message: "Kategori berhasil diperbarui",
                data: updatedCategory
            });
        } catch (error: any) {            if (error instanceof ZodError) {
                res.status(400).json({
                    message: "Validasi gagal",
                    errors: error.issues.map(err => ({
                        field: err.path[0],
                        message: err.message
                    }))
                });
                return;
            }
            res.status(500).json({
                status: "error",
                message: error.message || "Terjadi kesalahan server"
            });
        }

    }


    // delete category
    deleteCategory = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const categoryId = Number(id);

            if (isNaN(categoryId)) {
                res.status(400).json({
                    status: "fail",
                    message: "ID harus berupa angka"
                });
                return;
            }
            await categoryService.deleteCategory(categoryId);
            res.status(200).json({
                status: "success",
                message: "Kategori berhasil dihapus"
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message || "Terjadi kesalahan server"
            });
        }
    }


}