<script>
import { goto } from "$app/navigation";
import {page} from "$app/state"
import SelectionBar from "$lib/selectionBar.svelte"
import {onMount} from "svelte"
import { currencyMenu,linkUpdate } from "$lib/currencyMenu";
let formFill=$state(""||$linkUpdate)
let selectedGame = $state([])   
// $effect(() => {
//   console.log("formFill:", formFill)
// });
// $effect(()=>{console.log(selectedGame)})
let message=$state("")
let buyAmount=$state("")
let price=$derived(Number(buyAmount*selectedGame.multiplier))
$effect(()=>{
  if(isNaN(Number(buyAmount))){
    message="Please input numbers only"
  }
  else{message=`Estimated cost: $${price.toFixed(2)}`}
})
// $effect(()=>{console.log(buyAmount)})
let coinpaymentLink=$state("")
const handleSubmit=async(event)=> {
  event.preventDefault();
  try {
      const response = await fetch(coinpaymentLink, {
        method: 'GET'
      });
      // Check for redirect or error
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      // Get page content as text
      const html = await response.text();
      console.log(html);
    } catch (err) {
      console.error(err);
    }
}
</script>
<div class="h-screen justify-center items-center flex">
<form method="POST" onsubmit= {handleSubmit} class= "bg-gradient-to-br from-[#7d1b1f] to-red-700
flex-center flex-col w-[75%] rounded-2xl outline-2 outline-white shadow-2xl shadow-cyan-800 p-2  md:w-1/3 ">
<div class=" text-xl font-semibold text-white mb-2">Pick your Game Product</div>
<SelectionBar options={currencyMenu} selected={formFill} bind:value={selectedGame}/>
<div>
      <label for="buyAmount" >Amount to Buy in {selectedGame.symbol}</label>
      <input type="text" id="buyAmount" placeholder={selectedGame.placeholder} class="text-center" bind:value={buyAmount}/>
</div>
{#if message}
<div class="font-semibold text-white">{message}</div>
{/if}
<div>
      <label for="coinpayment" >Enter coinpayment link</label>
      <textarea type="text" id="coinpayment" placeholder="coinpayments.net/index.php?cmd=checkout&id=XXX&key=XXX" 
      class=" bg-white rounded flex mb-2 border-2 border-transparent focus:border-emerald-900 focus:outline-none focus:border-2 focus-within:bg-amber-400 font-semibold h-8 w-50 xl:h-12" 
      bind:value={coinpaymentLink} wrap="off"></textarea>
</div>
<button type="submit" class=" bg-white hover:bg-green-400 px-10">Submit</button>
</form>
</div>
