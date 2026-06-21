    import {ProductController} from "../controllers/productController.js";
    import {Router} from "express";
    import {authenticateToken} from "../middlewares/authMiddleware.js";

    
    const productController = new ProductController();

    const router = Router();


    router.get('/', authenticateToken, productController.getAllProduct);

    export default router;
