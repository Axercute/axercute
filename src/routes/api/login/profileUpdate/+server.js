import { startMongo } from "$lib/server/db/mongo"
import { User } from "$lib/server/model/user"
export const POST=async({request})=>{
try {
await startMongo();
    const data = await request.json()
    console.log("Updating profile picture...")
    const result = await User.findOneAndUpdate(
    {email:data.email},
    { $set: { profilePicture:data.prompt} },
    { strict: false } 
);
    console.log("updated profile picture", result);
    return new Response(JSON.stringify({message:"update success:",result})); //indicates success
  } catch (err) {
    console.error('POST /account picture update error:', err);
    return new Response('Internal Server Error for picture update', { status: 500 });
  }
}