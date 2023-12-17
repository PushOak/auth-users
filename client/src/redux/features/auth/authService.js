import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API_URL = `${SERVER_URL}/api/v1/auth/`;

// Validate email
export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + "register", userData);
    return response.data;
};

const authService = {
    register,
};

export default authService;