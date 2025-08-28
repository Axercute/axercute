<script>
import { order } from "$lib/marketplaceData"
import { page } from "$app/state";
	import { profilePicture } from "$lib/globalView";
const orderId=page.params.orderId
let display = order.find(element=>element.orderId==orderId)
$effect(()=>{console.log(display)})
</script>
{orderId}
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions-->
<div class="bg-webdarkpurple font-semibold text-white m-2 rounded-2xl flex flex-col hover:bg-webpink hover:cursor-pointer"
onclick={goto("/orderId")}>

<div class="flex flex-row h-100">
    
<img src={display.profilePicture} alt="invalidPic" class ="flex flex-col">


<div class="flex flex-col h-full justify-center pl-4">
<div class="flex font-bold text-amber-400 text-xl">Currency: {display.currency}</div>
<div class="flex font-semibold text-white text-md">Amount: {display.amount}{display.symbol}</div>
<div class="flex font-semibold text-white text-md">Total costs: ${display.SGDPricing}</div>
<div class="flex font-semibold text-white text-md">Exchange rate: ${display.exchangeRate}</div>
</div>

</div>

</div>
