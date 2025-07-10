import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createOrder, getOrderById, getAllOrders } from "../controllers/order.controller.js";

let router=Router()

router.use(verifyJWT)

router.route('/').get(getAllOrders).post(createOrder)

router.route("/:orderId").get(getOrderById)

export default router