import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true }, 
  password: {type: String, required: true},
  jwt: {type: String},
  is_admin: {type: Boolean, default: false},
  fullName: {type:String},
  balance:{type:Number,default: 1000},
  tokens:{type:Number,default: 10},
  KYCStatus:{type:Boolean,default: false} ,
  purchasedAmount:{type:Number,default:250},
  purchaseLimit:{type:Number, default: 500},
  profilePicture:{type:String,default:"https://thafd.bing.com/th/id/OIP.kuh91Um_3UgHSQintcs15QHaJR?w=138&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3"}
})

export const User = mongoose.models.User || mongoose.model("User", userSchema);
