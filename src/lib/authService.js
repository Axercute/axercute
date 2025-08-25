import { jwtDecode } from "jwt-decode";
// const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;
const signUp = async (formData) => {
try { 
    const response = await fetch(`/api/login/signUp`, {
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
    })

const data = await response.json();
console.log("account created",data)
alert("account created!")
if(data.err) {
    throw new Error(data.err);
}
} catch (err) {
    console.log(err);
    throw new Error(err.message);
    }
};

const signIn = async (formData ) => {
try {
    const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    if(data.err) {
        throw new Error(data.err);
    }
    if (data.jwt) {
        localStorage.setItem('token', data.jwt);
        const decoded = jwtDecode(data.jwt)
        return decoded
    }
    throw new Error('Invalid response from server');
} catch (err) {
    console.log(err);
    throw new Error(err.message);
}

};

export {signIn,signUp}
