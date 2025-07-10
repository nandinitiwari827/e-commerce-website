import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.models.js";
import { Order } from "../models/order.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, {isValidObjectId} from "mongoose"

let createOrder=asyncHandler(async(req, res)=>{
    let {user, items, shippingAddress, paymentMethod, subtotal, shipping, total}=req.body
    
    if(!user|| !items?.length || !shippingAddress || !paymentMethod){
        throw new ApiError(400, "Items, user, shipping address and payment method are required.")
    }

    if(!isValidObjectId(user)){
        throw new ApiError(400, "Invalid user Id")
    }

    let totalPrice=0
    for(let item of items){
        if(!isValidObjectId(item.product)){
            throw new ApiError(400, `Invalid product Id: ${item.product}`)
        }
        let product=await Product.findById(item.product)

        if(!product){
            throw new ApiError(404, `Product not found: ${item.product}`)
        }

        if(!product.sizes.includes(item.size)){
            throw new ApiError(400, `Invalid size ${item.size} for product ${product.name}`)
        }

        if(item.quantity<1 || item.quantity>6 || item.quantity>product.quantity){
            throw new ApiError(400, `Invalid quantity for product ${product.name}`)
        }

        item.name=product.name
        item.image=product.images[0]
        item.price=product.price
        totalPrice+=product.price*item.quantity
    }

    let {firstName, phoneNumber, addressLine, city, state, postalCode}=shippingAddress

    if(!firstName || !phoneNumber || !addressLine || !city || !state || !postalCode){
        throw new ApiError(400, "All shipping address fields are required except lastName and country.")
    }

    let validPaymentMethods=["COD", "UPI", "NetBanking", "Card"]
    if(!validPaymentMethods.includes(paymentMethod)){
        throw new ApiError(400, "Invalid payment method.")
    }

    let order=await Order.create({user, items, shippingAddress, paymentMethod, subtotal, shipping, totalPrice: total, orderStatus: "Pending"})

    return res.status(200).json(new ApiResponse(200, order, "Order created successfully."))
})

let getOrderById=asyncHandler(async(req, res)=>{
      let {orderId}=req.params

    if(!isValidObjectId(orderId)){
        throw new ApiError(400, "Invalid order Id.")
    }

    let order=await Order.findById(orderId)
    .populate("user items.product")
    .select("-__v")

    if(!order){
        throw new ApiError(404, "Order not found.")
    }

     return res.status(200).json(new ApiResponse(200, order, "Order fetched successfully."))
})

let getAllOrders=asyncHandler(async(req, res)=>{

    let page=parseInt(req.query.page) || 1
    let limit=parseInt(req.query.limit) || 10
    let skip=(page-1)*limit

    let orders=await Order.find({ user: req.user._id })
    .populate("user items.product")
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
    .select("-__v")

     return res.status(200).json(new ApiResponse(200, orders, "All orders fetched successfully."))
})

export {createOrder, getOrderById, getAllOrders}