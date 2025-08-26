import Stripe from 'stripe';
import { STRIPEKEY } from '$env/static/private';
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
