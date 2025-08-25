import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true }, 
  password: {type: String, required: true},
  jwt: {type: String},
  is_admin: {type: Boolean, default: false},
  fullName: {type:String},
  balance:{type:Number,default: 10},
  tokens:{type:Number,default: 10},
  KYCStatus:{type:Boolean,default: false} ,
  purchasedAmount:{type:Number,default:0},
  purchaseLimit:{type:Number, default: 500},
})

export const User = mongoose.models.User || mongoose.model("User", userSchema);
