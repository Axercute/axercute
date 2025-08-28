<script>
import {goto} from "$app/navigation"
import {loginStatus,profilePicture} from "$lib/globalView"
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
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions-->
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
    src={$profilePicture||"/favicon.svg"}
    alt="Invalid picture"
    class="h-14 object-contain cursor-pointer align-right absolute top-0 right-0"
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

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (image) -->
  <img 
    src={$profilePicture||"/favicon.svg"}
    alt="Profile" 
    class="h-12 cursor-pointer mr-auto"
    onclick={()=>{goto("/profile")}}
  />
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions-->
<div class="w-10 h-8 flex flex-col justify-between cursor-pointer mr-2 "  onclick={(event)=>{toggleOpen(event)}}>
  <span class="block h-1 bg-white rounded"></span>
  <span class="block h-1 bg-white rounded"></span>
  <span class="block h-1 bg-white rounded"></span>
</div>

</div>
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions-->
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
        <img src="https://thafd.bing.com/th/id/OIP.CO-ps-dgk9oMvd2uizNMmAHaP5?w=163&h=349&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3"alt="Tui na" class="w-full mr-3 hover:cursor-pointer"/>
    </nav>
