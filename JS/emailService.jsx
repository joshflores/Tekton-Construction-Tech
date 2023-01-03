import axios from "axios";

const emailService = {
    endpoint: `${API_HOST_PREFIX}/api/emailService`,
}

const sendEmail = (payload) => {

    const config = {
        method: "POST",
        url: `${emailService.endpoint}/contact`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

const emailServices = { sendEmail };
export default emailServices; 
