import mongoose, {Schema} from "mongoose";

let wishlistSchema=new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
    }]
}, {timestamps: true})

export let Wishlist=mongoose.model("Wishlist", wishlistSchema)