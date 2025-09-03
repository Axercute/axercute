<script>
import { goto } from "$app/navigation";
import { order } from "$lib/marketplaceData";
import { onMount } from "svelte";
const enterParams=(id)=>{
  goto(`/marketPlace/${id}`)
}

let data=$state("")
  const fetchOrder = async () => {
    try {
      const response = await fetch('/api/marketPlace');
      data = await response.json();
      // console.log(data)
    } catch (error) {
      console.error('Error fetching user:', error);
      goto('/login');
    }
  }
  onMount(fetchOrder)

</script>
{#if !data}
  <div class="flex justify-center items-center h-64">
    <div class="lds-dual-ring"></div>
  </div>
{:else}
{#each data as element}
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions-->
<div class="bg-webdarkpurple font-semibold text-white m-2 rounded-2xl flex flex-col hover:bg-webpink hover:cursor-pointer overflow-hidden"
onclick={enterParams(element._id)}>

<div class="flex flex-row h-32">
{#if element.currency==="OSRS"}  
<img src="/currency/osrs.jpg" alt="invalidPic" class ="flex flex-col">
{:else}
<img src="/currency/rs3.jpg" alt="invalidPic" class ="flex flex-col">
{/if}

<div class="flex flex-col h-full justify-center pl-4">
<div class="flex font-bold text-amber-400 text-xl">Currency: {element.currency}</div>
<div class="flex font-bold text-green-500 text-xl">Amount: {element.amount}{element.symbol}</div>
<div class="flex font-semibold text-white text-md">Total costs: ${Number(element.SGDPricing).toFixed(2)}</div>
<div class="flex font-semibold text-white text-md">Exchange rate: ${(element.SGDPricing/element.amount).toFixed(2)}/{element.symbol}</div>
</div>

</div>

</div>
{/each}
{/if}



