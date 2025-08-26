import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51RzEEnJPIS8z9OaJJdWJ2BTG4XRH6wC6tv6S7NaIhm0utpRV1Fmubm3eNbqNTedSj3yxoNGtchE1hXpU8RXVbXAD00SvVFvmHZ');
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
