import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addToCart, removeFromCart, getCartlist, clearCart } from "../controllers/cart.controller.js";

let router=Router()

router.use(verifyJWT)

router.route("/:productId").post( addToCart ).delete(removeFromCart)

router.route('/').get(getCartlist).delete(clearCart)

export default router