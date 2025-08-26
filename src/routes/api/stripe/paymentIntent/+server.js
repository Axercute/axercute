import Stripe from 'stripe';
import { STRIPEKEY } from '$env/static/private';
export const POST=async()=>{
try{
const paymentIntent = await stripe.paymentIntents.create({
  amount: 3000,
  currency: 'sgd',
  automatic_payment_methods: {
    enabled: true,
  },
});
console.log(paymentIntent)
return new Response(JSON.stringify(paymentIntent));
}
catch(error){
  const errorMessage = "unable to create payment"
  console.log(errorMessage,error)
  return new Response(errorMessage,error,{status:500})
}
}


export const GET=async()=>{
try{
const paymentIntent = await stripe.paymentIntents.retrieve("pi_3S0EguJPIS8z9OaJ2xIaCu01");
console.log(paymentIntent)
return new Response(JSON.stringify(paymentIntent));
}
catch(error){
  const errorMessage = "unable to get payment intent"
  console.log(errorMessage,error)
  return new Response(errorMessage,error,{status:500})
}
}
