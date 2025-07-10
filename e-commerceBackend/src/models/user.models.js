import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

let userSchema=new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        required: true,
        index: true,
        trim: true
    },
    lastName:{
        type: String,
        index: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    birthdate:{
        type: Date,
        required: true,
        validate: {
            validator: function(value){
                return value < new Date()
            },
            message: "Birthdate must be in past"
        }
    },
    avatar: {
        type: String
    },
    role:{
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    orders: [{
      type: Schema.Types.ObjectId,
      ref: "Order"
    }],
    cart: [{
    type: Schema.Types.ObjectId,
    ref: "Cart"
    }],

    wishlist: [{
    type: Schema.Types.ObjectId,
    ref: "Wishlist"
    }],

    refreshToken:{
        type: String,
    }
}, {timestamps: true})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password || typeof this.password !== 'string') {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  if (!password || typeof password !== 'string') {
    throw new Error('Input password must be a non-empty string');
  }
  if (!this.password || typeof this.password !== 'string') {
    throw new Error('Stored password is missing or invalid');
  }
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            birthdate: this.birthdate        
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id: this._id,     
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.index({firstName: "text", lastName: "text"})

export let User=mongoose.model("User", userSchema)


