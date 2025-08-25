<script>
import {goto} from "$app/navigation"
import {loginStatus} from "$lib/loginStatus"
let {navBarInfo}=$props() 
  let open = $state(true)
  const toggleOpen =(event)=>{event.stopPropagation();open=true}
  const toggleClose =()=>{open=false}
  import { onMount} from 'svelte';
  onMount(() => {
  window.addEventListener('click', toggleClose);
  return () => {
  window.removeEventListener('click', toggleClose);
};
  });
</script>
<!-- Header Bar -->
<div class="relative hidden md:flex justify-center items-center bg-gradient-to-bl from-webpink to-webpurple sticky top-0 z-10 h-14 px-4">
  <img
    src="/mainlogo.png"
    alt="Tui na"
    class="h-15 object-contain cursor-pointer align-left absolute top-0 left-0 h-15"
    onclick={()=>{goto(`/`)}}/>
<!--Desktop and Ipad-->
  <div class="hidden md:flex space-x-10 text-white font-semibold text-xl">
    {#if $loginStatus===false}
    {#each navBarInfo as { display, path }}
      <div
        class="cursor-pointer hover:text-amber-300"
        onclick={() => goto(`/${path}`)}
      >
        {display}
      </div>
    {/each}
    {:else}
    {#each navBarInfo as { display, path }}
      <div
        class="cursor-pointer hover:text-amber-300"
        onclick={() => goto(`/profile/${path}`)}
      >
        {display}
      </div>
    {/each}

    {/if}
  </div>
  
  <img
    src="/favicon.svg"
    alt="Tui na"
    class="h-15 object-contain cursor-pointer align-right absolute top-0 right-0 h-15"
    onclick={()=>{goto(`/profile`)}}/>

    </div>
<!--Mobile version-->
<div class="flex items-center justify-between bg-gradient-to-bl from-webpink to-webpurple sticky top-0 z-10 h-12 md:hidden">
  <img 
    src="/mainlogo.png" 
    alt="Tui na" 
    class="h-12 cursor-pointer border-2 border-white"
    onclick={()=>{goto("/")}}
  />

  <!-- Right profile (but also aligned left now) -->
  <img 
    src="/favicon.svg" 
    alt="Profile" 
    class="h-12 cursor-pointer mr-auto"
    onclick={()=>{goto("/profile")}}
  />

<div class="w-10 h-8 flex flex-col justify-between cursor-pointer mr-2 "  onclick={(event)=>{toggleOpen(event)}}>
  <span class="block h-1 bg-white rounded"></span>
  <span class="block h-1 bg-white rounded"></span>
  <span class="block h-1 bg-white rounded"></span>
</div>

</div>
<nav                                                   
  class={`fixed transition-[right] z-11 duration-500 ease-in-out ${open ? 'right-0' : '-right-1/2'} md:hidden from-webdarkpurple to-webpurple`}>
        <div class="flex flex-row text-left font-semibold" onclick={toggleClose}>
<div class="w-6 h-6 mt-5 relative cursor-pointer -right-40">
  <span class="absolute inset-0 w-full h-1 bg-white rotate-45 origin-center"></span>
  <span class="absolute inset-0 w-full h-1 bg-white -rotate-45 origin-center"></span>
</div>
        </div>
        {#if $loginStatus===false}
        {#each navBarInfo as {display,path}}
        <div onclick={(event)=>{goto(`/${path}`);toggleClose()}} class="text-right font-semibold mr-2">{display}</div> 
        {/each}
         {:else}
    {#each navBarInfo as { display, path }}
      <div
        class="text-right font-semibold mr-2"
        onclick={() => goto(`/profile/${path}`)}
      >
        {display}
      </div>
    {/each}
    {/if}
        <div class=" bg-amber-600 m-2 text-white text-right font-semibold">Grand Opening Sale! Consultation + TuiNa + Cupping / Scraping for only $42
        <img src="/tuipic.jpg"alt="Tui na" class="w-full mr-3 hover:cursor-pointer"/>
        </div> 
    </nav>
