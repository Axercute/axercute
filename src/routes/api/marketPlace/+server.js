import { startMongo } from "$lib/server/db/mongo"
import {Order} from "$lib/server/model/order"
import { User } from "$lib/server/model/user.js";
import { json } from "@sveltejs/kit";
export const POST=async({request,locals})=>{
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
    return json({message:'Internal Server Error for posting order'}, { status: 500 });
    }
    const data= await request.json();
    console.log('Pending Order...');
    data.SGDPricing=Number(data.SGDPricing)
    if(isNaN(data.SGDPricing)){
      console.log("Error submission, input is not a number")
      return json({error:"input isn't a number"},{status:400})
    }
    if (userFound.balance < data.SGDPricing) {
    console.log("insufficient balance!")
    return json({ error: "Insufficient balance" }, { status: 400 });
    }
    console.log("Current balance:", userFound.balance, "Trying to deduct:", data.SGDPricing);
const userBalanceRemaining = await User.findByIdAndUpdate(
  userFound._id,[{ $set: { balance: { $round: [{ $subtract: ["$balance", data.SGDPricing] }, 2]}}}],{ new: true });
  if (!userBalanceRemaining) {
  return json({ error: "Insufficient balance" }, { status: 400 });
}
    console.log("User balance remaining",userBalanceRemaining)
    const orderCreated = await Order.create({amount:data.amount,currency:data.currency,symbol:data.symbol,SGDPricing:data.SGDPricing,buyer:userFound._id})
    console.log("Order created!",orderCreated)
    return new Response(JSON.stringify({
        message:"Order successfully created",
        orderCreated
    }),{status: 200});
  } catch (error) {
    console.error('POST /order creation error:', error);
    return new Response('Internal Server Error for login', { status: 500 });
  }
}

export const GET = async () => {
    await startMongo()
    const orderFound = await Order.find()
    console.log("Orders found",orderFound)
    return new Response(JSON.stringify(orderFound), { status: 200 });
};  