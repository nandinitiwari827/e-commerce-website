import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.models.js";
import { Cart } from "../models/cart.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, {isValidObjectId} from "mongoose"

let addToCart = asyncHandler(async(req, res)=>{
     let userId=req.user._id
       let {size, quantity} = req.body
       let {productId}=req.params
   
       if(!isValidObjectId(productId)){
           throw new ApiError(400, "Invalid product Id")
       }
   
       let product=await Product.findById(productId)
   
       if(!product){
           throw new ApiError(404, "Product not found")
       }

       if(!size || !product.sizes.includes(size)){
        throw new ApiError(400, "Invalid or missing size")
       }

       let finalQuantity=quantity && quantity>0 && quantity<=6 ? quantity: 1
   
       let cart=await Cart.findOne({user: userId})
   
       if(!cart){
           cart=await Cart.create({user: userId, items: [{product: productId, name: product.name, image: product.images[0], price: product.price, size, quantity: finalQuantity}]})
       }else {
        let existingItemIndex=cart.items.findIndex(
            (item)=>item.product.toString()===productId && item.size===size
        )

        if(existingItemIndex>-1){
            cart.items[existingItemIndex].quantity+=finalQuantity
        }else{
         cart.items.push({product: productId, name: product.name, image: product.images[0], price: product.price, size, quantity: finalQuantity})
        }
       }
           await cart.save()
   
       return res.status(200).json(new ApiResponse(200, cart, "Product added to cart successfully."))
})

let removeFromCart = asyncHandler(async(req, res)=>{
     let userId=req.user._id
     let {size} = req.body
     let {productId}=req.params
    
        if(!isValidObjectId(productId)){
            throw new ApiError(400, "Invalid product Id")
        }
    
        let product=await Product.findById(productId)
    
        if(!product){
            throw new ApiError(404, "Product not found")
        }
    
        let cart=await Cart.findOne({user: userId})
    
        if(!cart){
            return res.status(200).json(new ApiResponse(200, {items: []}, "Cart is empty"))
        }
    
        let newItems=cart.items.filter(
            (item)=>!(item.product.toString()===productId && item.size===size)
        )

        if(newItems.length===cart.items.length){
            throw new ApiError(404, "Product with specified size not found in cart")
        }
        cart.items=newItems
        await cart.save()
    
        return res.status(200).json(new ApiResponse(200, cart, "Product removed from cart successfully."))
})

let clearCart = asyncHandler(async (req, res) => {
    let userId = req.user._id

    let result = await Cart.deleteMany({ user: userId })

    if (result.deletedCount === 0) {
        return res.status(200).json(new ApiResponse(200, {}, "Cart is already empty"))
    }

    return res.status(200).json(new ApiResponse(200, {}, "Cart cleared successfully"))
})

let getCartlist = asyncHandler(async(req, res)=>{
     let userId=req.user._id
   
       let cart=await Cart.findOne({user: userId}).populate("items.product")
   
       if(!cart){
           return res.status(200).json(new ApiResponse(200, {items: [], subtotal: 0, shipping: 0, total: 0 }, "Cart is empty"))
       }

  let items = cart.items || []
  let subtotal = items.reduce((acc, item) => {
    let price = parseFloat(item.product.price) || 0
    let quantity = parseFloat(item.quantity) || 1
    return acc + price * quantity
  }, 0)
  subtotal = parseFloat(subtotal.toFixed(2))

  let shipping = subtotal * 0.1
  shipping = parseFloat(shipping.toFixed(2))

  let total = (subtotal + shipping).toFixed(2)
   
return res.status(200).json(new ApiResponse(200, {items, subtotal, shipping, total}, "Cart fetched successfully"))
})

export {addToCart, removeFromCart, getCartlist, clearCart}