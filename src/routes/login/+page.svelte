<script>
import { goto } from '$app/navigation';
import { jwtDecode } from 'jwt-decode';
let email = $state("");
let password = $state("");
let message = $state("");
const handleSubmit = async (e) => {
try {
    e.preventDefault()
    const formSubmission = {email:email, password:password};
    const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formSubmission),
    });
    const data = await response.json();
    if(data.err) {
        throw new Error(data.err);
    }
    if (data.jwt) {
        localStorage.setItem('token', data.jwt);
        const decoded = jwtDecode(data.jwt)
        await goto('/profile');
        return decoded
    }
    if(!data.jwt){
    throw new Error('Invalid response from server');}
} 

catch (err) {
    console.log(err);
    throw new Error(err.message);
    }
  }
</script>
<div class="h-screen justify-center items-center flex">
<form onsubmit= {handleSubmit} class= "bg-gradient-to-br from-webpurple to-webdarkpurple
flex-center flex-col w-[75%] rounded-2xl outline-2 outline-white shadow-2xl shadow-cyan-800 p-2  md:w-1/3 ">
<div class="text-white m-2 font-semibold text-center">Enter your Email and password</div>
 <div>
<label for ="email" class="text-white">Email:</label>
<input id = "email"
type="email"
bind:value={email}
required
/>

</div>

 <div>
<label for ="password" class="text-white">Password:</label>
<input id ="password"
type="password"
bind:value={password}
required 
/>
</div> 

<div>
<button class="text-black bg-white hover:bg-green-400"type = "submit">Sign In</button>
</div>
<div class="text-white m-2 font-semibold text-center">Don't have an account yet? click 
    <a href="/login/signUp" class="text-emerald-400 underline hover:text-blue-300">here</a>  
    to sign up</div>
    
</form>
</div>



