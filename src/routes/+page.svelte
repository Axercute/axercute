<script>
    // $effect(()=>{console.log($linkUpdate)})
//   import { onMount} from 'svelte';
//   onMount(() => {
//   window.addEventListener('click', toggleClose);
//   return () => {
//   window.removeEventListener('click', toggleClose);
// };});
  import {goto} from "$app/navigation"
  import {linkUpdate} from "$lib/linkUpdate"
  let open = $state(false)
  let descriptionUpdate=$state("")
import {onMount} from "svelte"
import {fade} from "svelte/transition"
let carousel=["picture1.jpg","picture2.jpg","picture3.jpg","picture4.jpg"]
let currentIndex=$state(0)
let data = $state([])
  const fetchCurrency = async () => {
    try {
      const response = await fetch('/api/currency');
      data = await response.json();
      // console.log(data)
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
  onMount(fetchCurrency)
  // Automatically cycle every 10 seconds
  onMount(() => {
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % carousel.length;
    }, 10000); // 10000ms = 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  });
</script>
<div class="relative w-full h-64 md:h-100 xl:h-180">
   {#key carousel[currentIndex]} <img src={`/carousel/${carousel[currentIndex]}`} alt="Tui na" class="w-full h-full object-cover absolute" transition:fade={{ duration: 1000 }} key={carousel[currentIndex]}/>{/key}
  <button class="absolute top-[80%] left-[50%] rounded-2xl text-white bg-webpink
    shadow translate-x-[-50%] translate-y-[-50%] hover:bg-webpurple text-xl" onclick={()=>{goto("./topUp")}}>
   Top Up Now
  </button>
</div>
<div class="flex-center text-white bg-gradient-to-bl from-webpink to-webpurple font-semibold">Available currencies</div>
<!--display flex card on treatment-->
<div class="flex flex-row flex-wrap justify-center items-center">
{#each data as {image,text,link}}
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions-->
<div class="relative group w-40 h-40 flex justify-center items-center text-center m-2 hover:cursor-pointer" onclick={()=>{linkUpdate.set(link);goto("./trade")}}>
<img src = {image} alt ="digestion" class=" rounded-2xl absolute w-full h-full " />
<div class="absolute w-full h-full rounded-2xl group-hover:bg-red-800/70"></div>
<div class=" text-white font-semibold absolute hidden group-hover:block">{text}</div>
</div>
{/each}
</div>

