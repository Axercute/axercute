import { startMongo } from "$lib/server/db/mongo"
import { Order } from "$lib/server/model/order"
export const POST=async()=>{
  try {
    await startMongo();
const count = await Order.countDocuments();
console.log("Orders in DB:", count);
    const result = await Order.deleteMany(
  {},
    { $set: { tokens:0} },
    { strict: false } 
);

    console.log("Test JWT update result:", result);

  } catch (err) {
    console.error('POST /account login error:', err);
    return new Response('Internal Server Error for login', { status: 500 });
  }
}

