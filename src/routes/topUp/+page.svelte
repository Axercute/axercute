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

let submissionLogic = $derived(
{
price:Number(price),
})
let submissionString=$derived(JSON.stringify(submissionLogic))
const handleSubmit=async(event)=> {
  event.preventDefault();
  console.log(submissionString);
  const response = await fetch('/api/appointment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: submissionString
  });
  
  const result = await response.json();
  const link = result._id
  await goto(`/booking/${link}`)
  window.open(`https://wa.me/6582881687?text=${message}`, "_blank");
}
</script>
<div class="h-screen justify-center items-center flex">
<form method="POST" onsubmit= {handleSubmit} class= "bg-gradient-to-br from-[#7d1b1f] to-red-700
flex-center flex-col w-[75%] rounded-2xl outline-2 outline-white shadow-2xl shadow-cyan-800 p-2  md:w-1/3 ">
<div class=" text-xl font-semibold text-white mb-2">Pick your Game Product</div>
<SelectionBar options={currencyMenu} selected={formFill} bind:value={selectedGame}/>
<div>
      <label for="buyAmount" >Amount to Buy in {selectedGame.symbol}</label>
      <input type="text" id="buyAmount" placeholder={selectedGame.placeholder} class="text-center" bind:value={buyAmount} required />
</div>
{#if message}
<div class="font-semibold text-white">{message}</div>
{/if}
<button type="submit" class=" bg-white hover:bg-green-400 px-10">Submit</button>
</form>
</div>
