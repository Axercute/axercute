import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51RzEEnJPIS8z9OaJJdWJ2BTG4XRH6wC6tv6S7NaIhm0utpRV1Fmubm3eNbqNTedSj3yxoNGtchE1hXpU8RXVbXAD00SvVFvmHZ');
export const POST = async()=>{
try{
const product = await stripe.products.create({
  name: 'Starter Subscription',
  description: '$12/Month subscription'
})
const price=await stripe.prices.create({
    unit_amount: 1200,
    currency: 'usd',
    recurring: {interval: 'month'},
    product: product.id
  })
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your starter subscription price id: ' + price.id);
  return new Response (JSON.stringify({productId:product.id,priceId:price.id},{status:200}))
}
catch(error){
    console.error(error);
    return new Response('Error creating subscription', { status: 500 });
}
}
