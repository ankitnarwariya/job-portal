import axios from 'axios';

const registerUser = async ({ name, email, mobile, password }) => {
    try {
        const reqUrl = "http://localhost:3000/api/v1/auth/register";
        const response = await axios.post(reqUrl, { name, email, mobile, password });
        console.log(response);
    } catch (error) {
        console.error(error);
        alert("Something went wrong");
    }
}

const logInUser = async ({ email, password }) => {
    try {
        const reqUrl = "http://localhost:3000/api/v1/auth/login";
        const response = await axios.post(reqUrl, { email, password });

        localStorage.setItem("token", response.data.token)
        return response.data.name;
    } catch (error) {
        console.error(error);
        alert("Something went wrong");
    }
}

export { registerUser, logInUser }