<script>
import { goto } from "$app/navigation";
import { order } from "$lib/marketplaceData";
const enterParams=(orderId)=>{
  goto(`/marketPlace/${orderId}`)
}
</script>
{#each order as element}
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions-->
<div class="bg-webdarkpurple font-semibold text-white m-2 rounded-2xl flex flex-col hover:bg-webpink hover:cursor-pointer"
onclick={enterParams(element.orderId)}>

<div class="flex flex-row h-32">
    
<img src="/currency/osrs.jpg" alt="invalidPic" class ="flex flex-col">


<div class="flex flex-col h-full justify-center pl-4">
<div class="flex font-bold text-amber-400 text-xl">Currency: {element.currency}</div>
<div class="flex font-semibold text-white text-md">Amount: {element.amount}{element.symbol}</div>
<div class="flex font-semibold text-white text-md">Total costs: ${element.SGDPricing}</div>
<div class="flex font-semibold text-white text-md">Exchange rate: ${element.exchangeRate}</div>
</div>

</div>

</div>
{/each}




