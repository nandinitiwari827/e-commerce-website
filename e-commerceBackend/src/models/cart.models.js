import mongoose, {Schema} from "mongoose";

let cartItemSchema=new Schema({
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
            }})

    let cartSchema=new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: [cartItemSchema]
    }, {timestamps: true})

export let Cart=mongoose.model("Cart", cartSchema)