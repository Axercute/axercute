<script>
import { goto } from '$app/navigation';
import { onMount } from 'svelte'
import {profilePicture} from "$lib/globalView"
const logout=()=> {
localStorage.removeItem('token');
window.location.href = '/';
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
      // console.log($profilePicture)
    } catch (error) {
      console.error('Error fetching user:', error);
      goto('/login');
    }
  }
  onMount(fetchProfile)

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
<div class="rounded-2xl flex flex-col m-2 font-semibold bg-webpink border border-black text-white justify-center">
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions-->
<div class="flex flex-row w-full">
<div class="flex flex-col w-1/2" onclick={formShow=true}>
<img src={data.user.profilePicture} alt="picIssue" class="h-40 cursor-pointer border-2 xl:h-100"/>
</div>
<div class="flex flex-col w-1/2 justify-center p-2">
<div class="font-bold">{data.user.fullName}</div>
<div class="font-bold">Balance: ${data.user.balance}</div>
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
</div>
</div>
{/if}