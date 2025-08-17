<script>
  import {goto} from "$app/navigation"
  import {currencyMenu} from "$lib/currencyMenu"
  let open = $state(false)
  let descriptionUpdate=$state("")
  let linkUpdate=$state("")
//   import { onMount} from 'svelte';
//   onMount(() => {
//   window.addEventListener('click', toggleClose);
//   return () => {
//   window.removeEventListener('click', toggleClose);
// };});
import {onMount} from "svelte"
import {fade} from "svelte/transition"
let carousel=["picture1.jpg","picture2.jpg","picture3.jpg","picture4.jpg"]
let currentIndex=$state(0)
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
  <button class="absolute top-[80%] left-[50%] rounded-2xl text-white bg-red-800
    shadow translate-x-[-50%] translate-y-[-50%] hover:bg-red-400 text-xl" onclick={()=>{goto("./booking")}}>
   Top Up Now
  </button>
</div>
<div class="flex-center text-white bg-red-800 font-semibold">Available currencies</div>
<!--display flex card on treatment-->
<div class="flex flex-row flex-wrap justify-center items-center">
{#each currencyMenu as {image,text,link}}
<div class="relative group w-40 h-40 flex justify-center items-center text-center m-2 hover:cursor-pointer" onclick={()=>{goto(`./${link}`)}}>
<img src = {image} alt ="digestion" class=" rounded-2xl absolute w-full h-full " />
<div class="absolute w-full h-full rounded-2xl group-hover:bg-red-800/70"></div>
<div class=" text-white font-semibold absolute hidden group-hover:block">{text}</div>
</div>
{/each}
</div>

