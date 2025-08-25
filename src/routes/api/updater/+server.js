import { startMongo } from "$lib/server/db/mongo"
import { User } from "$lib/server/model/user"
export const POST=async()=>{
  try {
    await startMongo();
const count = await User.countDocuments();
console.log("Users in DB:", count);
    const result = await User.deleteMany(
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

