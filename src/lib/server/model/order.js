import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
amount: {type: Number, required: true},
currency:{type:String},
symbol: {type:String},
SGDPricing:{type:Number},
status:{type:String, default:"open"},
buyer:{type:String, required:true},
seller:{type:String}
})

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
