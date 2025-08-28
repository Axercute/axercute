import mongoose from "mongoose";


const currencySchema = new mongoose.Schema({
image: {type: String, required: true},
text:{type:String},
link: {type:String},
multiplier:{type:Number},
symbol:{type:String},
placeholder:{type:String}
})

export const Currency = mongoose.models.Currency || mongoose.model("Currency", currencySchema);
