import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, {isValidObjectId} from "mongoose";

let createProduct=asyncHandler(async(req, res)=>{
    let {name, price, images, sizes, quantity}=req.body

    if(!name || !price || !images?.length || !sizes?.length){
        throw new ApiError(400, "Name, price, images and sizes are required.")
    }

    if(price<0){
        throw new ApiError(400, "Price must be positive number.")
    }

    let product=await Product.create({name, price, images, sizes, quantity: quantity || 1})

    return res.status(200).json(new ApiResponse(200, product, "Product created successfully."))
})

let updateProduct=asyncHandler(async(req, res)=>{
    let {productId}=req.params
    let {name, price, images, sizes, quantity}=req.body 

    if(!isValidObjectId(productId)){
        throw new ApiError(400, "Invalid product Id")
    }

    let product=await Product.findById(productId)

    if(!product){
        throw new ApiError(404, "Product not found")
    }

    if(name!==undefined) product.name=name
    if(price!==undefined) product.price=price
    if(Array.isArray(images) && images.length) product.images=images
    if(Array.isArray(sizes) && sizes.length) product.sizes=sizes
    if(quantity!==undefined) product.quantity=quantity

    await product.save()

    return res.status(200).json(new ApiResponse(200, product, "Product updated successfully"))
})

let deleteProduct=asyncHandler(async(req, res)=>{
    let {productId}=req.params

    if(!isValidObjectId(productId)){
        throw new ApiError(400, "Invalid product Id")
    }

    let product=await Product.findByIdAndDelete(productId)

    if(!product){
        throw new ApiError(404, "Product not found")
    }

    return res.status(200).json(new ApiResponse(200, {}, "Product deleted successfully"))
})

let getAllProducts=asyncHandler(async(req, res)=>{
    let products=await Product.find().sort({createdAt: 1})

    return res.status(200).json(new ApiResponse(200, products, "All products fetched successfully"))
})

let getProductById=asyncHandler(async(req, res)=>{
     let {productId}=req.params

    if(!isValidObjectId(productId)){
        throw new ApiError(400, "Invalid product Id")
    }

    let product=await Product.findById(productId)

    if(!product){
        throw new ApiError(404, "Product not found")
    }

    return res.status(200).json(new ApiResponse(200, product, "Product deleted successfully"))
})

let rateProduct=asyncHandler(async(req, res)=>{
      let {productId}=req.params
      let {rating}=req.body
      let userId=req.user._id

    if(!isValidObjectId(productId)){
        throw new ApiError(400, "Invalid product Id")
    }

    let product=await Product.findById(productId)

    if(!product){
        throw new ApiError(404, "Product not found")
    }

    if(rating>5 || rating<0){
        throw new ApiError(400, "Rating must be between 0 and 5")
    }

    let existingRating=product.ratings.find(r=>r.user.toString()==userId.toString())

    if(existingRating){
        existingRating.rating=rating
    }else{
        product.ratings.push({user: userId, rating})
    }

    await product.save()

    return res.status(200).json(new ApiResponse(200, product, "Product rated successfully"))
})

export {createProduct, updateProduct, deleteProduct, getAllProducts, getProductById, rateProduct}