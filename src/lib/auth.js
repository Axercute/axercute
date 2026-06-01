import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { startMongo } from '$lib/server/db/mongo.js';
import { sveltekitCookies } from "better-auth/svelte-kit";
import { BETTER_AUTH_URL } from '$env/static/private';

const db = await startMongo()
console.log("DB:", db);
const users = db.collection("users");
console.log("Users collection:", users);
export const auth = betterAuth({
   baseURL: BETTER_AUTH_URL,
database: mongodbAdapter(db, {
        collections: {
            user: "users",
        },
    }),
     emailAndPassword: { 
    enabled: true, 
  }, 
  plugins: [sveltekitCookies()], // make sure this is the last plugin in the array
});


