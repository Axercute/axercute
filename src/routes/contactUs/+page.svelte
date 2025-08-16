<script>
  const contactUsInfo = [
    {address:"Contact us in Whatsapp and we can resolve your issue",
      phone:"6598143839",
      branch:"Main Branch",
    },
  ]
let choices = [...new Set(contactUsInfo.map((element)=>{return element.branch}))];
let selectedChoice = choices[0];
let displayMenu = [];
 const filterMenu = (branch) => {
  selectedChoice = branch;
  displayMenu = contactUsInfo.filter((element)=>element.branch ===selectedChoice);
 }
 filterMenu(selectedChoice)
</script>
  <div class="flex flex-wrap justify-center mt-3">
    {#each choices as element}
      <div
        class={`px-4 py-2 font-semibold bg-red-400 border border-black text-white
                ${selectedChoice === element
                  ? 'bg-red-800' 
                  : 'text-red-800'} hover:cursor-pointer hover:bg-red-500`}
        onclick={() => filterMenu(element)}
      >
        {element}
        </div>
    {/each}
    </div>

    
<div  class="bg-gradient-to-br from-[#7d1b1f] to-red-700 p-2 
flex-center flex-col w-[75%] mx-auto mt-50 rounded-2xl outline-2 outline-black shadow-2xl shadow-cyan-800 md:w-2/3 xl:w-1/2">
<div class="flex font-semibold text-white text-2xl text-center m-2">Lost?</div>
    {#each displayMenu as element}
        <div class="flex font-semibold text-white text-center m-2">{element.address}</div>
        <a href={`https://wa.me/${element.phone}?text=I would like to ask about...`} target="_blank"
        class=" bg-white rounded-md hover:bg-green-400 p-2 m-2">Chat with us</a>
        <a href="/"
        class=" bg-white mt-1 rounded-md hover:bg-green-400 p-2 m-2">Get back to Home</a>
    {/each}
</div>
