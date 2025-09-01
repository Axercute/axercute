import { startMongo } from "$lib/server/db/mongo"
import { Order } from "$lib/server/model/order.js";
import { User } from "$lib/server/model/user.js";
export const GET=async({params})=>{
  try {
    await startMongo();
    const orderId = params.orderId
    console.log('🔎 Looking for order ID...');
    const order = await Order.findById(orderId)
    console.log('✅ order ID found', order);
    const buyerDetail = await User.findById(order.buyer)
    console.log("Buyer detail:",buyerDetail)
    const combinedBoth = {order,buyerDetail}
    return new Response(JSON.stringify(combinedBoth), {status:201});
  } catch (err) {
    console.error('GET /orderId fetch error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}