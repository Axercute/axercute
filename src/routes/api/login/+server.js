import { startMongo } from "$lib/server/db/mongo"
import { User } from "$lib/server/model/user"
import crypto from "crypto-js";
import jwt from "jsonwebtoken"
import { SECRET } from "$env/static/private";
export const POST=async({request})=>{
  try {
    await startMongo();
    const data= await request.json();
    console.log('🔎 Loggin in...');
    data.password = crypto.PBKDF2(data.password, "abc", { keySize: 8, iterations: 1000 }).toString(crypto.enc.Base64)
    console.log("user info checking...", data);
    //looks for the user using email and pw
    const userFound = await User.findOne({ email: data.email, password: data.password })
    if (!userFound) { // not found
        return new Response("User not found")
    }
    const payload = {_id:userFound._id,email:userFound.email};
    const token = jwt.sign(payload ,SECRET,{ expiresIn: "24h" })
    await User.updateOne({ email: data.email }, { jwt: token })
    console.log("Login success!",token)
    return new Response(JSON.stringify({message:"login success:",jwt: token})); //indicates success
  } catch (err) {
    console.error('POST /account login error:', err);
    return new Response('Internal Server Error for login', { status: 500 });
  }
}

