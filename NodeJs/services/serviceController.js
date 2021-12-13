const axios = require('axios');


const BASE_URL = 'http://127.0.0.1:';
const ports = ["8000","8001","8002","8003","8004", "8005"]
function getHeader(token) {
    return { headers: { Authorization: `Token ${token}` } }
}
module.exports = {
    register: (data) => {
        return axios.post(`${BASE_URL}${ports[0]}/emp`, data);
    },
    login: (data) => {
        return axios.post(`${BASE_URL}${ports[0]}/emplogin`, data);
    },
    logout: (token) => {
        return axios.get(`${BASE_URL}${ports[0]}/logout`, getHeader(token));
    },
    createPost: (data, token) => {
        return axios.post(`${BASE_URL}${ports[1]}/post/`, data, getHeader(token));
    },
    getUserPosts: (token,id) => {
        return axios.get(`${BASE_URL}${ports[2]}/post/${id}`, getHeader(token));
    },
    deleteUserPost: (PID, token) => {
        return axios.delete(`${BASE_URL}${ports[3]}/post/${PID}`, getHeader(token));
    },
    updateUserPost: (PID, data, token) => {
        console.log("inside node update service:", data, PID, token)
        return axios.put(`${BASE_URL}${ports[4]}/post/${PID}/`, data, getHeader(token));
    },
    loginGoogle: (data) => {
        // var response = await axios.get(`${BASE_URL}${ports[5]}/service_get/${ports[5]}`)
        // console.log("response status:", response.data[0])
        // if (response.data[0] === "up")
        return axios.post(`${BASE_URL}${ports[5]}/emplogin`, data);
        // else if (response.data[0] === "down")
        //     return "service unavailable"
    },
    service_check: () => {
        return axios.get(`${BASE_URL}${ports[5]}/servicecheck`);
    },
    registerSocial: (data) => {
        return axios.post(`${BASE_URL}${ports[5]}/emp`, data);
    },
    getServiceStatus: () => {
        return axios.get(`${BASE_URL}${ports[5]}/service_get/${ports[1]}`);
    },
    createServiceStatus: (data) => {
        return axios.get(`${BASE_URL}${ports[5]}/service_insert`);
    },
    updateServiceStatus: (type, data) => {
        return axios.get(`${BASE_URL}${ports[5]}/service_update/${type}`);
    },
    // getThirdPartyData: (token) => {
    //     return axios.get(`${BASE_URL}getThirdPartyData`, getHeader(token));
    // },
}
