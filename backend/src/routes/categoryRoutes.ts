    import {CategoryController} from "../controllers/categoryController.js";
    import {Router} from "express";
    import {authenticateToken} from "../middlewares/authMiddleware.js";


    const categoryController = new CategoryController();



    const router = Router();

    router.get("/categories", authenticateToken, categoryController.getAllCategories);
    router.get("/categories/:id", authenticateToken, categoryController.getById);
    router.post("/categories", authenticateToken, categoryController.createCategory);
    router.put("/categories/:id", authenticateToken, categoryController.updateCategory);
    router.delete("/categories/:id", authenticateToken, categoryController.deleteCategory);


    export default router;