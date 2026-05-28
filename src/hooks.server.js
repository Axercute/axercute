import { env } from '$env/dynamic/private';
import jwt from "jsonwebtoken"
export const handle=async({ event, resolve })=> {
    let token = event.request.headers.get("Authorization")
    if (token) {
        token = token.replace("Bearer ", "");
        // console.log("Token received: ", token);
        try{
        const user = jwt.verify(token, env.SECRET);
        // console.log("User from token: ", user);
        event.locals.user=user
        }
        catch(error){
        console.error("JWT verification failed:", error.message);
        event.locals.user=null
        }    
    }
    else {
        event.locals.user = null;
    }
  return resolve(event);
}

// import { auth } from "$lib/auth";
// import { svelteKitHandler } from "better-auth/svelte-kit";
// import { building } from "$app/environment";

// export async function handle({ event, resolve }) {
//   return svelteKitHandler({ event, resolve, auth, building });
// }
