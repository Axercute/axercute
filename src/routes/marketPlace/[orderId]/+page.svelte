<script>
import { goto } from "$app/navigation";
import { page } from "$app/state";
import { onMount } from "svelte";
import { profileId } from "$lib/globalView";
const orderId=page.params.orderId
let data;
const fetchOrderId = async () => {
try {
	const response = await fetch(`/api/marketPlace/${orderId}`, {method:"GET"}
)
	data = await response.json();
	// console.log("order ID fetched",data)
} catch (error) {
	console.error('Error fetching user:', error);
	goto('/login');
}
}
onMount(fetchOrderId)

const buyOrderId =async()=>{
	const token = localStorage.getItem('token');
    if (!token) {
      goto('/login');
      return;
    }
	try{
	const response = await fetch(`/api/marketPlace/${orderId}`, {
	method: 'POST',
	headers: {Authorization: `Bearer ${token}`,}
	});
	const result = await response.json()
	console.log(result)
	goto("/marketPlace")
	}
	catch (error){
	console.error('Error fetching user:', error);
	alert("ensure you are logged in before taking the order")
	goto('/profile');
	}
}


</script>
{#if !data}
<div class="flex justify-center items-center h-64">
<div class="lds-dual-ring"></div>
</div>
{:else}
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions-->
<div class="flex flex-col justify-center items-center">
<div class="w-50 h-50 rounded-full mt-5">
<img src={data.buyerDetail.profilePicture} alt="invalidPic"  class="w-full h-full object-cover rounded-full">
</div>
<div class="flex flex-col font-bold text-white text-2xl">{data.buyerDetail.fullName}</div>
<div class="flex flex-col font-bold text-white text-2xl">Trust score: {data.buyerDetail.purchaseLimit}</div>

<div class="flex font-bold text-amber-400 text-xl">Currency: {data.order.currency}</div>
<div class="flex font-bold text-green-500 text-xl">Amount: {data.order.amount}{data.order.symbol}</div>
<div class="flex font-semibold text-white text-xl">Total costs: ${data.order.SGDPricing}</div>
<div class="flex font-semibold text-white text-xl">Exchange rate: ${(data.order.SGDPricing/data.order.amount).toFixed(2)}/{data.order.symbol}</div>

<div class="flex flex-row">
<button onclick={buyOrderId}>Accept Order</button>
<button class="hover:bg-red-600" onclick={goto("/marketPlace")}>Decline Order</button>
</div>


</div> 

{/if}


