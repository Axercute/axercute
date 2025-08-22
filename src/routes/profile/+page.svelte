<script>
import { goto } from '$app/navigation';
import { onMount } from 'svelte'
import {loginStatus} from "$lib/loginStatus"
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
      const response = await fetch('/api/protection', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      data = await response.json();
      loginStatus.set(data.loginStatus)
      console.log(data.user.email)
    } catch (error) {
      loginStatus.set(false)
      console.error('Error fetching user:', error);
      goto('/login');
    }
  });
</script>
{#if !data}
  <div class="flex justify-center items-center h-64">
    <div class="lds-dual-ring"></div>
  </div>
{:else}
<div class="flex flex-col  m-2 font-semibold bg-red-400 border border-black text-white hover:cursor-pointer">
<div class="flex flex-row w-full">
<div class="flex flex-col w-1/2 ">
<img src="/favicon.svg" alt="Tui na" class="h-30 cursor-pointer border-2"/>
</div>
<div class="flex flex-col w-1/2 justify-center p-2">
<div class="font-bold">{data.user.name}</div>
<div class="font-bold">Balance: ${data.user.balance}</div>
<div class="font-bold">treasury tokens: {data.user.token}</div>
<button>Top Up</button>
</div>
</div>


<div class="flex flex-col p-2">
  <div>Purchase limit this month:</div>
<div class="flex bg-white border-2 border-black text-center text-black relative rounded-2xl z-10">
  <div class="bg-red-500 h-full rounded-2xl text-center absolute" style="width: 50%"></div>
  <div class="z-10 flex-center">$0/{data.user.purchaseLimit}</div>
  </div>
    {#if data.user.KYCStatus === false}
  <div class="text-white mt-3">✖ KYC Not Verified</div>
  <button>Verify here</button>
      {:else}
  <div class="text-green-400">✅ KYC Verified</div>
    {/if}
</div>
</div>
{/if}