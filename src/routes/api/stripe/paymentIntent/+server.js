import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51RzEEnJPIS8z9OaJJdWJ2BTG4XRH6wC6tv6S7NaIhm0utpRV1Fmubm3eNbqNTedSj3yxoNGtchE1hXpU8RXVbXAD00SvVFvmHZ');
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
