<script>
import { goto } from "$app/navigation";
import {page} from "$app/state"
import SelectionBar from "$lib/selectionBar.svelte"
import {onMount} from "svelte"
import {linkUpdate } from "$lib/linkUpdate";
let formFill=$state(""||$linkUpdate)
let selectedGame = $state([])   
let data = $state([])
  const fetchCurrency = async () => {
    try {
      const response = await fetch('/api/currency');
      data = await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
onMount(fetchCurrency)
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
const handleSubmit=async(event)=> {
  const formSubmission={
  currency:selectedGame.link,
  amount:Number(buyAmount),
  symbol:selectedGame.symbol.charAt(0),
  SGDPricing:Number(price.toFixed(2))
}
event.preventDefault();
console.log(formSubmission)
const token = localStorage.getItem('token');
  if (!token) {
    goto('/login');
    return;
  }
  try{
  const response = await fetch(`/api/marketPlace`, {
  method: 'POST',
  headers: {Authorization: `Bearer ${token}`},
  body: JSON.stringify(formSubmission),
  });
  const data = await response.json();
  if(!response.ok){
    alert("Insufficent balance!")
    goto("/profile")
    return
  }
  if(data.err) {
  throw new Error(data.err);
  }
  goto("/marketPlace")
  }
  catch (err) {
  console.log(err);
  throw new Error(err.message);
  }
}
</script>
<div class="h-screen justify-center items-center flex">
<form method="POST" onsubmit= {handleSubmit} class= "bg-gradient-to-br from-webdarkpurple to-webpurple
flex-center flex-col w-[75%] rounded-2xl outline-2 outline-white shadow-2xl shadow-cyan-800 p-2  md:w-1/3 ">
<div class=" text-xl font-semibold text-white mb-2">Pick your Game Product</div>
<SelectionBar options={data} selected={formFill} bind:value={selectedGame}/>
<div>
      <label for="buyAmount" >Amount to Buy in {selectedGame.symbol}</label>
      <input type="text" id="buyAmount" placeholder={selectedGame.placeholder} class="text-center" bind:value={buyAmount}/>
</div>
{#if message}
<div class="font-semibold text-white">{message}</div>
{/if}
<button type="submit" class=" bg-white hover:bg-green-400 px-10">Submit</button>
</form>
</div>
