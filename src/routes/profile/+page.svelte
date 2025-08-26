<script>
import { goto } from '$app/navigation';
import { invalidateAll } from '$app/navigation';
import { onMount } from 'svelte'
import {loginStatus} from "$lib/loginStatus"
import { updateProfile } from '$lib/authService';
loginStatus.set(false)
const logout=()=> {
localStorage.removeItem('token');
window.location.href = '/admin';
}

let data;
  onMount(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      goto('/login');
      return;
    }
    try {
      const response = await fetch('/api/login/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      data = await response.json();
      loginStatus.set(data.loginStatus)
    } catch (error) {
      loginStatus.set(false)
      console.error('Error fetching user:', error);
      goto('/login');
    }
  });

const askImage=async()=>{
  try {
  const question = prompt("Key in your profile picture")
  const formSubmission = {prompt:question,email:data.user.email}
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
  await goto(".")
  await goto("/profile")
  } 
  catch (err) {
  console.log(err);
  throw new Error(err.message);
  }
}

</script>
{#if !data}
  <div class="flex justify-center items-center h-64">
    <div class="lds-dual-ring"></div>
  </div>
{:else}
<div class="rounded-2xl flex flex-col  m-2 font-semibold bg-webpink border border-black text-white">
<div class="flex flex-row w-full">
<div class="flex flex-col w-1/2" onclick={askImage}>
<img src={data.user.profilePicture} alt="invalid image" class="h-30 cursor-pointer border-2"/>
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
      {:else}
  <div class="text-green-400">✅ KYC Verified</div>2
    {/if}
</div>
</div>
{/if}