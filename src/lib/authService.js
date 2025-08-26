import { jwtDecode } from "jwt-decode";
// const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const updateProfile = async(formData)=>{
try {
const response = await fetch(`/api/login/profileUpdate`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData),
});
const data = await response.json();
if(data.err) {
    throw new Error(data.err);
}
console.log("update pfp completed",data.result.profilePicture)
} catch (err) {
console.log(err);
throw new Error(err.message);
}
}



export {updateProfile}
