import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const EMAILS_URL = `${SERVER_URL}/api/v1/emails/`;

// Send automated email
const sendAutomatedEmail = async (emailData) => {
    const response = await axios.post(EMAILS_URL + "sendAutomatedEmail", emailData);
    return response.data.message;
};

const emailService = {
    sendAutomatedEmail,
};

export default emailService;