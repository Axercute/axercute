// const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;
// const signUp = async (formData) => {
// try { 
//     const res = await fetch(`${BASE_URL}/create`, {
//         method: 'POST',
//         headers : {'Content-Type': 'application/json'},
//         body: JSON.stringify(formData),
//     })

// const data = await res.json();

// if(data.message) {
//     return data.message;
// }

// throw new Error('Invalid response from server');
// } catch (err) {
//     console.log(err);
//     throw new Error(err.message);
//     }
// };
import { jwtDecode } from "jwt-decode";
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

export {signIn}
