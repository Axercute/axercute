<script>
import { goto } from '$app/navigation';
let formSubmission = {
    fullName:"",
    dob:"",
    email:"",
    password:"",
    confirmPassword:""
}
let message = $state("");
const handleSubmit = () => {
try {
    if(formSubmission.password.length<10){
        return alert("Please input a string that is over length of 10")
    }
    if(formSubmission.password!==formSubmission.confirmPassword){
        return alert("Please make sure your password and confirm password are the same")
    }
    console.log(formSubmission)
    // const user = await signIn(formData); 
    // message = 'Successfully logged in';
    // goto('/dashboard');
    } catch (err) {
    message = err.message;
    }
}
</script>
<div class="h-screen justify-center items-center flex">
<form onsubmit= {handleSubmit} class= "bg-gradient-to-br from-[#7d1b1f] to-red-700
flex-center flex-col w-[75%] rounded-2xl outline-2 outline-white shadow-2xl shadow-cyan-800 p-2  md:w-1/3 ">
<div class="text-white m-2 font-semibold text-center">Please provide us with your personal details</div>

<div>
<label for ="fullName" class="text-white">Full name in NRIC</label>
<input id = "fullName" type="text" bind:value={formSubmission.fullName} required/>
</div>

<div>
<div class="relative">
<label for ="dob" class="text-white">Date of birth</label>
<input class="w-50" id = "dob" type="date" bind:value={formSubmission.dob} required/>
</div>
</div>

<div>
<label for ="email" class="text-white">Email</label>
<input id = "email" type="email" bind:value={formSubmission.email} required/>
</div>
<div>
<label for ="password" class="text-white">Password</label>
<input id ="password" type="password" bind:value={formSubmission.password} required/>
</div> 

<div>
<label for ="confirmPassword" class="text-white">Confirm password</label>
<input id ="confirmPassword" type="password" bind:value={formSubmission.confirmPassword} required/>
</div> 

<div>
<button class="text-black bg-white hover:bg-green-400"type = "submit">Sign Up</button>
</div>
</form>
</div>



<style>
  /* Custom styling for the date picker icon */
  input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 0.2rem; /* Tailwind's spacing scale: ~12px */
    cursor: pointer;
  }
</style>