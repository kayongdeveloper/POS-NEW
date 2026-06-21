    import {CategoryController} from "../controllers/categoryController.js";
    import {Router} from "express";
    import {authenticateToken} from "../middlewares/authMiddleware.js";


    const categoryController = new CategoryController();



    const router = Router();

    router.get("/", authenticateToken, categoryController.getAllCategories);
    router.get("/:id", authenticateToken, categoryController.getById);
    router.post("/", authenticateToken, categoryController.createCategory);
    router.put("/:id", authenticateToken, categoryController.updateCategory);
    router.delete("/:id", authenticateToken, categoryController.deleteCategory);


    export default router;