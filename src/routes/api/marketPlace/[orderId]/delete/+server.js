import { startMongo } from "$lib/server/db/mongo"
import { Order } from "$lib/server/model/order.js";
import { User } from "$lib/server/model/user.js";
import { json } from "@sveltejs/kit";

//call is going to be api/marketPlace/orderId/delete
export const POST=async({params,locals})=>{
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
    // const order = await Order.findById(orderId)
    // console.log('Deleting this order', order);
    const deletedOrder = await Order.findByIdAndDelete(orderId)
    console.log("order is deleted",deletedOrder)
    // const sellerFound = await Order.findByIdAndUpdate(order._id,{seller:userFound._id,status:"pending"},{new:true})
    return json(deletedOrder, { status: 200 });
    
  } catch (error) {
    console.error('POST /order creation error:', error);
    return json({message:'Internal Server Error'}, { status: 500 });
  }
}