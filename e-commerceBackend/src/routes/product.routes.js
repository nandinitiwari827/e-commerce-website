import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById, rateProduct } from "../controllers/product.controller.js";

let router=Router()

router.route("/").post(createProduct).get(getAllProducts)
router.route("/:productId").get( getProductById ).patch(updateProduct).post(verifyJWT, rateProduct).delete( deleteProduct )

export default router