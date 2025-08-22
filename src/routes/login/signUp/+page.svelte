<script>
import { goto } from '$app/navigation';
import { Datepicker } from 'svelte-calendar';
import dayjs from 'dayjs';
let formSubmission = $state({
    fullName:"",
    dob:new Date(),
    email:"",
    password:"",
    confirmPassword:""
})
const theme = {
		calendar: {
			width: '600px',
      fontSize: "1px",
			shadow: '0px 0px 5px rgba(0, 0, 0, 0.25)'
		}
	};

let message = $state("");
const handleSubmit = (e) => {
try {
  e.preventDefault()
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

<div class="relative" >
<label for ="dob" class="text-white">Date of birth</label>
  <Datepicker id="dob" bind:selected={formSubmission.dob} format="DD/MM/YYYY" {theme}></Datepicker>
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



