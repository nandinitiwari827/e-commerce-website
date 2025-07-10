import mongoose, {Schema} from "mongoose";

let productSchema=new Schema({
    name:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    images: [{
                type: String,
                required: true,
                validate: {
                    validator: (value) => /^https?:\/\/.+$/.test(value),
                    message: "Invalid image URL",
                },
            }],
    sizes: [{
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "1X", "2X", "3X", "4X"],
        required: true
    }],

    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number, required: true, min: 0, max: 5 }
    }],

    quantity: {
        type: Number,
        default: 1,
        min: 0,
        max: 6
    }
}, {timestamps: true})

export let Product=mongoose.model("Product", productSchema)