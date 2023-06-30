import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
console.log(baseUrl);
const instance = axios.create({
    baseURL: baseUrl,
});

instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
export default instance;