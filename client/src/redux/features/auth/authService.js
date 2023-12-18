import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const AUTH_URL = `${SERVER_URL}/api/v1/auth/`;
const USERS_URL = `${SERVER_URL}/api/v1/users/`;

// Validate email
export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Register user
const register = async (userData) => {
    const response = await axios.post(AUTH_URL + "register", userData);
    return response.data;
};

// Login existing user
const login = async (userData) => {
    const response = await axios.post(AUTH_URL + "login", userData);
    return response.data;
};

// Logout existing user
const logout = async () => {
    const response = await axios.get(AUTH_URL + "logout");
    return response.data.message;
};

// Get login status
const getLoginStatus = async () => {
    const response = await axios.get(AUTH_URL + "login-status");
    return response.data;
};

// Get user profile
const getUser = async () => {
    const response = await axios.get(USERS_URL + "get-user");
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    getLoginStatus,
    getUser,
};

export default authService;