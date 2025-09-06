<script>
import { goto } from '$app/navigation';
import { onMount } from 'svelte'
import {profilePicture,profileId} from "$lib/globalView"
const logout=()=> {
localStorage.removeItem('token');
window.location.href = '/';
profileId.set("")
}

let data=$state("")
let formShow = $state(false)
let profileInput = $state("")
  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      goto('/login');
      return;
    }
    try {
      const response = await fetch('/api/login/profile', {
        method:"GET",
        headers: {
        Authorization: `Bearer ${token}`,},
      });
      data = await response.json();
      profilePicture.set(data.user.profilePicture)
      profileId.set(data.user._id)
      // console.log($profilePicture)
    } catch (error) {
      console.error('Error fetching user:', error);
      goto('/login');
    }
  }
  onMount(fetchProfile)

let buyOrders=$state("")
let sellOrders = $state("")
  const fetchOrder = async () => {
    try {
      const response = await fetch('/api/marketPlace');
      const responseJson = await response.json();
      buyOrders=responseJson.filter(element=>element.buyer===$profileId)
      sellOrders=responseJson.filter(element=>element.seller===$profileId)
      // console.log(buyOrders)
    } catch (error) {
      console.error('Error fetching user:', error);
      goto('/login');
    }
  }
  onMount(fetchOrder)

const askImage=async()=>{
  try {
  if (profileInput.length>300){
    alert("Link is too long!")
    formShow=false
    profileInput=""
    return
  }
  const formSubmission = {prompt:profileInput,email:data.user.email}
  const response = await fetch(`/api/login/profileUpdate`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(formSubmission),
  });
  const result = await response.json();
  if(result.err) {
  throw new Error(data.err);
  }
  console.log("update pfp completed",result)
  fetchProfile()
  formShow=false
  profileInput=""
  } 
  catch (err) {
  console.log(err);
  throw new Error(err.message);
  }
}

const enterParams=(id)=>{
  goto(`/profile/${id}`)
}

</script>
{#if formShow}
<form onsubmit={askImage}
  class="flex flex-col items-center justify-center absolute 
         top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
         h-45 w-80 bg-gradient-to-br from-purple-800 to-webpurple z-20 rounded-2xl text-white font-semibold p-4 border-2 border-white">

  <div class="w-full text-center">
    <label for="profileChange" class="block mb-2">
      Please input a link to change your profile picture
    </label>
    <input type="text" id="profileChange" placeholder="https://thafd.bing.com/th/id/OIP.wjmWAMUiIG0lX-0asSDmCwHaEK?w=181&h=102&c=7&r=0&o=7&dpr=3&pid=1.7&rm=3" autofocus
           class="text-center w-full text-black rounded" bind:value={profileInput}/>
  </div>

  <div class="flex w-full justify-between ">
  <button type="submit" 
          class="bg-white hover:bg-green-400 px-6 rounded text-webdarkpurple">
    Submit
  </button>

    <button type="button" 
          class="bg-white hover:bg-green-400 px-6 rounded text-webdarkpurple" onclick={formShow=false}>
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
<div class="flex-center">

<div class="rounded-2xl flex flex-col m-2 font-semibold bg-webpink border border-white 
text-white justify-center overflow-hidden w-full md:w-150 xl:w-250">

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions-->
<!-- This is for flex-row flow to align side by side on PFP -->
<div class="flex flex-row w-full">
<div class="flex flex-col w-1/2" onclick={formShow=true}>
<img src={data.user.profilePicture} alt="picIssue" class="h-50 cursor-pointer border-2 xl:h-120"/>
</div>
<div class="flex flex-col w-1/2 justify-center p-2">
<div class="font-bold">{data.user.fullName}</div>
<div class="font-bold">Balance: ${data.user.balance.toFixed(2)}</div>
<div class="font-bold">treasury Tokens: {data.user.tokens}</div>
<button>Top Up</button>
</div>
</div>


<div class="flex flex-col p-2 text-center">
<div>Purchase limit this month:</div>
<!-- progress bar -->
<div class="flex items-center justify-center bg-white border-2 border-black text-center text-black relative rounded-2xl">
  <!-- progress bar loading -->
<div class="bg-red-500 h-full rounded-2xl text-center absolute flex left-0" style='width: {data.user.purchasedAmount/data.user.purchaseLimit*100}%'></div>
    <div class="relative z-10">${data.user.purchasedAmount}/{data.user.purchaseLimit}</div>
  </div>
    {#if data.user.KYCStatus === false}
  <div class="text-white mt-3">✖ KYC Not Verified</div>
  <button>Verify here</button>
  <button onclick={logout}>Log Out</button>
      {:else}
  <div class="text-green-400">✅ KYC Verified</div>2
    {/if}
    
<!-- displaying buy orders -->
<div>Your buy orders:</div>
{#if !buyOrders}
  <div class="flex justify-center items-center h-64">
    <div class="lds-dual-ring"></div>
  </div>
{:else}

<!-- displaying as an array -->
{#each buyOrders as element}
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions-->
<div class="bg-webdarkpurple font-semibold text-white m-1 rounded-2xl flex flex-col hover:bg-webpurple hover:cursor-pointer overflow-hidden"
onclick={enterParams(element._id)}>

<div class="flex flex-row h-25">
{#if element.currency==="OSRS"}  
<img src="/currency/osrs.jpg" alt="invalidPic" class ="flex flex-col">
{:else}
<img src="/currency/rs3.jpg" alt="invalidPic" class ="flex flex-col">
{/if}

<div class="flex flex-col h-full justify-center pl-4">
<div class="flex font-bold text-amber-400 text-md">Currency: {element.currency}</div>
<div class="flex font-bold text-green-500 text-md">Amount: {element.amount}{element.symbol}</div>
<div class="flex font-semibold text-white text-sm">Total costs: ${element.SGDPricing}</div>
<div class="flex font-semibold text-white text-sm">Exchange rate: ${(element.SGDPricing/element.amount).toFixed(2)}/{element.symbol}</div>
</div>

</div>

</div>
{/each}

{/if}

<!-- displaying sell orders -->
<div>Your sell orders:</div>
{#if !sellOrders}
  <div class="flex justify-center items-center h-64">
    <div class="lds-dual-ring"></div>
  </div>
{:else}

<!-- displaying as an array -->
{#each sellOrders as element}
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions-->
<div class="bg-webdarkpurple font-semibold text-white m-1 rounded-2xl flex flex-col hover:bg-webpurple hover:cursor-pointer overflow-hidden"
onclick={enterParams(element._id)}>

<div class="flex flex-row h-25">
{#if element.currency==="OSRS"}  
<img src="/currency/osrs.jpg" alt="invalidPic" class ="flex flex-col">
{:else}
<img src="/currency/rs3.jpg" alt="invalidPic" class ="flex flex-col">
{/if}

<div class="flex flex-col h-full justify-center pl-4">
<div class="flex font-bold text-amber-400 text-md">Currency: {element.currency}</div>
<div class="flex font-bold text-green-500 text-md">Amount: {element.amount}{element.symbol}</div>
<div class="flex font-semibold text-white text-sm">Total costs: ${element.SGDPricing}</div>
<div class="flex font-semibold text-white text-sm">Exchange rate: ${(element.SGDPricing/element.amount).toFixed(2)}/{element.symbol}</div>
</div>

</div>

</div>
{/each}

{/if}

</div>

</div>
</div>
{/if}