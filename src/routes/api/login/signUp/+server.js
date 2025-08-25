import { startMongo } from "$lib/server/db/mongo"
import { User } from "$lib/server/model/user"
import crypto from "crypto-js";
import { Appointment } from "$lib/server/model/appointment.js";
import jwt from "jsonwebtoken"
import { SECRET } from "$env/static/private";
export const POST=async({request})=>{
  try {
    await startMongo();
    const data= await request.json();
    console.log('🔎 Signing up...');
    data.password = crypto.PBKDF2(data.password, "abc", { keySize: 8, iterations: 1000 }).toString(crypto.enc.Base64)
    console.log("creating account...", data)
    const userCreated = await User.create({email:data.email,password:data.password,fullName:data.fullName})
    return new Response(JSON.stringify({
        message:"account created successfully",
        userCreated
    }),{status: 200});
  } catch (err) {
    console.error('POST /account creation error:', err);
    return new Response('Internal Server Error for signing up', { status: 500 });
  }
}

