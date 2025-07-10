import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlist.controller.js";

let router=Router()

router.use(verifyJWT)

router.route("/:productId").post( addToWishlist ).delete(removeFromWishlist)

router.route('/').get(getWishlist)

export default router