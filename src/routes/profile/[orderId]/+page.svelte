<script>
import { goto } from "$app/navigation";
import { page } from "$app/state";
import { onMount } from "svelte";
import { profileId } from "$lib/globalView";
const orderId=page.params.orderId
let data=$state("")
let confirmation = $state(false)
let deleteSuccess=$state(null)
const fetchOrderId = async () => {
const token = localStorage.getItem('token');
if (!token) {
  goto('/login');
  return;
}
try {
	const response = await fetch(`/api/marketPlace/${orderId}`, {method:"GET",headers: {Authorization: `Bearer ${token}`}}
	)
	data = await response.json();
  
} catch (error) {
	console.error('Error fetching user:', error);
	goto('/login');
}
}
onMount(fetchOrderId)

const cancelOrder=async()=>{
confirmation=false
const token = localStorage.getItem('token');
if (!token) {
  goto('/login');
  return;
}
try {
	const response = await fetch(`/api/marketPlace/${orderId}/delete`, {method:"POST",headers: {Authorization: `Bearer ${token}`}}
	)
	deleteSuccess = await response.json();
  // window.alert(`${data.amount},${data.SGDPricing}`)

} catch (error) {
	console.error('Error fetching user:', error);
	goto('/login');
}
}

   let dots = $state("")
  setInterval(() => {
    dots = dots.length < 3 ? dots + "." : "";
  }, 1000);
</script>

{#if confirmation}
<form onsubmit={cancelOrder}
  class="flex flex-col items-center justify-center absolute 
         top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
         h-45 w-80 bg-gradient-to-br from-purple-800 to-webpurple z-20 rounded-2xl text-white font-semibold p-4 border-2 border-white">

  <div class="w-full text-center flex flex-col justify-center items-center">
    <div class="flex font-bold text-white text-lg">Please confirm if you are cancelling this order</div>
    <div class="flex font-bold text-green-500">Order cancel: {data.order.amount}{data.order.symbol}</div>
    <div class="flex font-bold text-amber-400">Total refund: ${data.order.SGDPricing}</div>
  </div>

  <div class="flex w-full justify-between ">
  <button type="submit" 
          class="bg-white hover:bg-green-400 px-6 rounded text-webdarkpurple">
    Confirm
  </button>

    <button type="button" 
          class="bg-white hover:bg-red-600 px-6 rounded text-webdarkpurple" onclick={confirmation=false}>
    Cancel
  </button>
  </div>
</form>
{/if}

{#if !data}
<div class="flex justify-center items-center h-64">
<div class="lds-dual-ring"></div>
</div>
{:else}
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions-->

<div class="flex flex-col justify-center items-center">

<!-- {#if data.sellerDetail ===null}
one of them cmi
{/if} -->
{#if data.sellerDetail===null}
<div class="flex flex-col font-bold text-white text-2xl animate-bounce mt-2">Awaiting buyer{dots}</div>
{:else if data.sellerDetail._id===$profileId}
<div class="w-50 h-50 rounded-full mt-5">
<img src={data.buyerDetail.profilePicture} alt="invalidPic"  class="w-full h-full object-cover rounded-full">
</div>
<div class="flex flex-col font-bold text-white text-2xl">Order you accepted: {data.buyerDetail.fullName}</div>
<div class="flex flex-col font-bold text-white text-2xl">Trust score: {data.buyerDetail.purchaseLimit}</div>
{:else if data.buyerDetail._id===$profileId}
<div class="w-50 h-50 rounded-full mt-5">
<img src={data.sellerDetail.profilePicture} alt="invalidPic"  class="w-full h-full object-cover rounded-full">
</div>
<div class="flex flex-col font-bold text-white text-2xl">Seller found: {data.sellerDetail.fullName}</div>
<div class="flex flex-col font-bold text-white text-2xl">Trust score: {data.sellerDetail.purchaseLimit}</div>
{/if}

<div class="flex font-bold text-amber-400 text-xl">Currency: {data.order.currency}</div>
<div class="flex font-bold text-green-500 text-xl">Amount: {data.order.amount}{data.order.symbol}</div>
<div class="flex font-semibold text-white text-xl">Total costs: ${data.order.SGDPricing}</div>
<div class="flex font-semibold text-white text-xl">Exchange rate: ${(data.order.SGDPricing/data.order.amount).toFixed(2)}/{data.order.symbol}</div>

<div class="flex flex-row">
<button>Bargain</button>
<button class="hover:bg-red-600" onclick={confirmation=true}>Cancel Order</button>
</div>
</div> 
{/if}

{#if deleteSuccess}
<div class="flex flex-col items-center justify-center absolute 
         top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
         h-45 w-80 bg-gradient-to-br from-purple-800 to-webpurple z-20 rounded-2xl text-white font-semibold p-4 border-2 border-white">
<div class="w-full text-center flex flex-col justify-center items-center">
    <div class="flex font-bold text-red-600 text-lg">Delete Successful!</div>
    <div class="flex font-bold text-green-500">Order cancel: {deleteSuccess.amount}{deleteSuccess.symbol}</div>
    <div class="flex font-bold text-amber-400">Total refund: ${deleteSuccess.SGDPricing}</div>
  </div>
<button type="button" onclick={()=>{deleteSuccess=""; goto("/profile")}}>Noted</button>
</div>
{/if}

