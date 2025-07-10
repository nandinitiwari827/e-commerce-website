import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.models.js";
import { Wishlist } from "../models/wishlist.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, {isValidObjectId} from "mongoose"

let addToWishlist = asyncHandler(async(req, res)=>{
    let userId=req.user._id
    let {productId} = req.params

    if(!isValidObjectId(productId)){
        throw new ApiError(400, "Invalid product Id")
    }

    let product=await Product.findById(productId)

    if(!product){
        throw new ApiError(404, "Product not found")
    }

    let wishlist=await Wishlist.findOne({user: userId})

    if(!wishlist){
        wishlist=await Wishlist.create({user: userId, products: [productId]})
    }else{
        if( wishlist.products.includes(productId)){
            throw new ApiError(409, "Product already in wishlist")
        }
        wishlist.products.push(productId)
        await wishlist.save()
    }

    return res.status(200).json(new ApiResponse(200, wishlist, "Product added to wishlist successfully."))
})

let removeFromWishlist = asyncHandler(async(req, res)=>{
    let userId=req.user._id
    let {productId} = req.params

    if(!isValidObjectId(productId)){
        throw new ApiError(400, "Invalid product Id")
    }

    let product=await Product.findById(productId)

    if(!product){
        throw new ApiError(404, "Product not found")
    }

    let wishlist=await Wishlist.findOne({user: userId})

    if(!wishlist){
       return res.status(200).json(new ApiResponse(200, {items: []}, "Wishlist is empty"))
    }

    let productIndex=wishlist.products.indexOf(productId)
    if(productIndex===-1){
        throw new ApiError(404, "Product not in wishlist")
    }

    wishlist.products.splice(productIndex, 1)
    await wishlist.save()

    return res.status(200).json(new ApiResponse(200, wishlist, "Product removed from wishlist successfully."))
})

let getWishlist = asyncHandler(async(req, res)=>{
      let userId=req.user._id

    let wishlist=await Wishlist.findOne({user: userId}).populate("products")

    if(!wishlist){
        return res.status(200).json(new ApiResponse(200, {items: []}, "Wishlist is empty"))
    }

    return res.status(200).json(new ApiResponse(200, wishlist, "Wishlist fetched successfully"))
})

export {addToWishlist, getWishlist, removeFromWishlist}

