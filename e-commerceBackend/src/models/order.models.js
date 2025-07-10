import mongoose, {Schema} from "mongoose";

let addressSchema=new Schema({
    firstName: {
                type: String,
                required: true
            },
             lastName: {
                type: String,
            },
            phoneNumber: {
                type: String,
                required: true
            },
            addressLine: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            postalCode: {
                type: String,
                required: true
            },
            country: {
                type: String,
                default: "India"
            }
})

let orderItemSchema=new Schema({
            product: { 
            type: Schema.Types.ObjectId,
            ref: "Product",
            },
            name: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            size: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                max: 6
            }
})

let orderSchema=new Schema({
     user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [orderItemSchema],
        shippingAddress: addressSchema,
       
        paymentMethod: {
            type: String,
            enum: ["COD", "UPI", "NetBanking", "Card"],
            required: true
        },

        orderStatus: {
            type: String,
            enum: ["Pending", "Processing", "Delivered", "Cancelled"],
            default: "Delivered"
        },
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    shipping: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
}, {timestamps: true})

export let Order=mongoose.model("Order", orderSchema)