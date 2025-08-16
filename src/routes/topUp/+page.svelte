<script>
import { goto } from '$app/navigation';
import SelectionBar from "$lib/selectionBar.svelte"
import { GameProducts } from '$lib/gameProducts';
import {onMount} from "svelte"
let selectedGame=$state("OSRS")
let price = $state(0)
  $effect(() => {
    console.log("selectedGame:", selectedGame); // access via .value
  });
let submissionLogic = $derived(
{
price:Number(price),
})
let submissionString=$derived(JSON.stringify(submissionLogic))

const handleSubmit=async(event)=> {
  event.preventDefault();
  // console.log(submissionString);
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
let buyAmount = $state(0)
</script>
<div class="h-screen justify-center items-center flex">
<form method="POST" onsubmit= {handleSubmit} class= "bg-gradient-to-br from-[#7d1b1f] to-red-700
flex-center flex-col w-[75%] rounded-2xl outline-2 outline-white shadow-2xl shadow-cyan-800 p-2  md:w-1/3 ">
<div class=" text-xl font-semibold text-white">Choose your Game Product</div>
<SelectionBar options={GameProducts.map(element=>element.gameProduct)} selected={GameProducts[0].gameProduct} bind:value={selectedGame}/>
<div class="font-semibold text-white">Cost Estimated: ${price.toFixed(2)}</div>
<button type="submit" class=" bg-white hover:bg-green-400 px-10">Submit</button>
</form>
</div>
