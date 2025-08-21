import { startMongo } from "$lib/server/db/mongo"
import { User } from "$lib/server/model/user"
export const POST=async()=>{
  try {
    await startMongo();
const count = await User.countDocuments();
console.log("Users in DB:", count);
    const result = await User.updateMany(
  {},
    { $set: { balance:0,token:0,KYCStatus:false,purchaseLimit:500,} },
    { strict: false } 
);

    console.log("Test JWT update result:", result);

  } catch (err) {
    console.error('POST /account login error:', err);
    return new Response('Internal Server Error for login', { status: 500 });
  }
}

