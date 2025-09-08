// import Stripe from 'stripe';
// import { env } from '$env/dynamic/private';
// import { json } from '@sveltejs/kit';
// const stripe = new Stripe(env.STRIPEKEY,{apiVersion: '2022-11-15'});
// export const POST=async()=>{
// try{
// const customer = await stripe.customers.create({
//   email: 'customer123@example.com',
//   name:"Customer 959"
// });
// console.log(customer)
// return json(customer.id);
// }
// catch(error){
//   const errorMessage = "unable to create customer"
//   console.log(errorMessage,error)
//   return json(errorMessage,error,{status:500})
// }
// }


// // export async function GET() {
// // const text = "testing"

// //   return new Response("test"
// //   );
// // }



// // export async function GET() {
// //   return new Response("Hello from API!", {
// //     headers: {
// //       "Content-Type": "text/plain"
// //     }
// //   });
// // }
