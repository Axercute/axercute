// // src/routes/api/protected/+server.js
// //original route protection
// export const GET = async ({ locals }) => {
//     // locals.user was set in hooks.server.js after JWT verification
//     if (!locals.user) {
//         return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
//     }
//     return new Response(JSON.stringify({
//         message: "You are authorized",
//         user: locals.user
//     }), { status: 200 });
// };


