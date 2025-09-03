import { startMongo } from "$lib/server/db/mongo"
import { Order } from "$lib/server/model/order.js";
import { User } from "$lib/server/model/user.js";
import { json } from "@sveltejs/kit";
export const GET=async({params})=>{
  try {
    await startMongo();
    const orderId = params.orderId
    console.log('🔎 Looking for order ID...');
    const order = await Order.findById(orderId)
    console.log('✅ order ID found', order);
    const buyerDetail = await User.findById(order.buyer)
    console.log("Buyer detail:",buyerDetail)
    return json({order,buyerDetail}, {status:201});
  } catch (err) {
    console.error('GET /orderId fetch error:', err);
    return json({message:'Internal Server Error'}, { status: 500 });
  }
}

export const POST=async({locals,params})=>{
  try {
    await startMongo();
    // locals.user was set in hooks.server.js after JWT verification
    if (!locals.user) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }
    const userFound = await User.findById(locals.user._id)
    console.log("User data fetched",userFound)
    
    if(!userFound){
    console.error('POST /order creation error:', error);
    return json({message:'Internal Server Error'}, { status: 500 });
    }

    const orderId = params.orderId
    console.log('🔎 Looking for order ID...');
    const order = await Order.findById(orderId)
    console.log('✅ order ID found', order);
    
    const sellerFound = await Order.findByIdAndUpdate(order._id,{seller:userFound._id,status:"pending"},{new:true})
    return json(sellerFound, { status: 200 });
  

    
// const userBalanceRemaining = await User.findByIdAndUpdate(
//   userFound._id,[{ $set: { balance: { $round: [{ $subtract: ["$balance", data.SGDPricing] }, 2]}}}],{ new: true });
//     console.log("User balance remaining",userBalanceRemaining)
//     const orderCreated = await Order.create({amount:data.amount,currency:data.currency,symbol:data.symbol,SGDPricing:data.SGDPricing,buyer:userFound._id})
//     console.log("Order created!",orderCreated)
//     return new Response(JSON.stringify({
//         message:"Order successfully created",
//         orderCreated
//     }),{status: 200});
  } catch (error) {
    console.error('POST /order creation error:', error);
    return json({message:'Internal Server Error'}, { status: 500 });
  }
}