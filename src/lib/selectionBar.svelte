<script>
  import {onMount} from "svelte"
  let {selected, options,value=$bindable(),...props} = $props();
  let open = $state(false);
$effect(() => {
  if (!selected || !options.length) return;
  const match = options.find(element => element.link.includes(selected));
  if (match && value?.link !== match.link) {
    value = match; // only updates if truly different
  }
});

</script> 

<div class="w-50 mx-auto relative">
  
  <div class={`w-full border rounded text-center hover:cursor-pointer ${open ? `bg-webpink`: `bg-white`}`}
    onclick={() => (open = !open)}>{selected}</div>
    <div>
{#if open}
  <div class="absolute w-full z-50 bg-white mt-1 shadow">
    {#each options as element}
      <div class="px-4 py-1 text-center hover:bg-amber-400 cursor-pointer"
        onclick={() => {
          selected = element.link
          value = element;
          open = false;
        }}
      >
        {element.link}
      </div>
    {/each}
  </div>
{/if}
      </div>
</div>
