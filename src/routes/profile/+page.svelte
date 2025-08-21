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
<div>Welcome back {data?.user?.name}</div>
<div>Current balance: ${data?.user?.balance}</div>
<button>Top Up</button>
<div>treasure tokens: {data?.user?.token}</div>
<div>KYC status: {data?.user?.KYCStatus}</div>
<div>Purchase limit this month: $0/{data?.user?.purchaseLimit}</div>
