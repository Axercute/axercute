<script>
	import { goto } from "$app/navigation";
import { page } from "$app/state";
import { onMount } from "svelte";
const orderId=page.params.orderId
let data;
const fetchOrderId = async () => {
try {
	const response = await fetch(`/api/marketPlace/${orderId}`);
	data = await response.json();
	// console.log("order ID fetched",data)
} catch (error) {
	console.error('Error fetching user:', error);
	goto('/login');
}
}
onMount(fetchOrderId)

  // Messages array
  let messages = [];

  // Input value
  let input = "";

  // Scroll container reference
  let chatContainer;

  // Send message
  const sendMessage = () => {
    if (!input.trim()) return;

    messages = [...messages, { user: "You", text: input }];
    input = "";
    scrollToBottom();
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    setTimeout(() => {
      chatContainer?.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
    }, 50);
  };

  onMount(() => scrollToBottom());
</script>
{#if !data}
<div class="flex justify-center items-center h-64">
<div class="lds-dual-ring"></div>
</div>
{:else}
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions-->
<div class="flex flex-col justify-center items-center">
<div class="w-50 h-50 rounded-full mt-5">
<img src={data.buyerDetail.profilePicture} alt="invalidPic"  class="w-full h-full object-cover rounded-full">
</div>
<div class="flex flex-col font-bold text-white text-2xl">{data.buyerDetail.fullName}</div>
<div class="flex flex-col font-bold text-white text-2xl">Trust score: {data.buyerDetail.purchaseLimit}</div>

<div class="flex font-bold text-amber-400 text-xl">Currency: {data.order.currency}</div>
<div class="flex font-bold text-green-500 text-xl">Amount: {data.order.amount}{data.order.symbol}</div>
<div class="flex font-semibold text-white text-xl">Total costs: ${data.order.SGDPricing}</div>
<div class="flex font-semibold text-white text-xl">Exchange rate: ${(data.order.SGDPricing/data.order.amount).toFixed(2)}/{data.order.symbol}</div>

<div class="flex flex-row">
<button>Bargain</button>
<button class="hover:bg-red-600" onclick={goto("/marketPlace")}>Decline Order</button>
</div>

<div class="flex flex-col h-[500px] w-full max-w-md border rounded-2xl shadow-lg bg-white overflow-hidden">
  <!-- Messages -->
  <div bind:this={chatContainer} class="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
    {#each messages as msg, i}
      <div class={`flex ${msg.user === "You" ? "justify-end" : "justify-start"}`}>
        <div
          class={`p-2 rounded-xl max-w-xs break-words ${
            msg.user === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          <span class="font-semibold">{msg.user}: </span>{msg.text}
        </div>
      </div>
    {/each}
  </div>

  <!-- Input area -->
  <form onsubmit={sendMessage} class="flex p-3 border-t bg-white">
    <input
      type="text"
      bind:value={input}
      placeholder="Type a message..."
      class="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring focus:ring-blue-300"
    />
    <button
      type="submit"
      class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
    >
      Send
    </button>
  </form>
</div>

</div> 


{/if}


