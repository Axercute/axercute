import Stripe from 'stripe';
import { env } from '$env/dynamic/private';
const stripe = new Stripe(env.STRIPEKEY);
export const POST=async()=>{
try{
const customer = await stripe.customers.create({
  email: 'customer123@example.com',
  name:"Customer 959"
});
console.log(customer)
return new Response(customer.id);
}
catch(error){
  const errorMessage = "unable to create customer"
  console.log(errorMessage,error)
  return new Response(errorMessage,error,{status:500})
}
}


// export async function GET() {
// const text = "testing"

//   return new Response("test"
//   );
// }



// export async function GET() {
//   return new Response("Hello from API!", {
//     headers: {
//       "Content-Type": "text/plain"
//     }
//   });
// }
