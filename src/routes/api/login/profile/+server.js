import { User } from '$lib/server/model/user.js';
import { startMongo } from '$lib/server/db/mongo.js';
import { loginStatus } from '$lib/loginStatus.js';

export const GET = async ({ locals }) => {
    // locals.user was set in hooks.server.js after JWT verification
    if (!locals.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    await startMongo()
    const userFound = await User.findById(locals.user._id)
    console.log("User data fetched",userFound)
    return new Response(JSON.stringify({
        loginStatus:true,
        message: "You are authorized",
        user: userFound
    }), { status: 200 });
};