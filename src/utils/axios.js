import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
    baseURL: baseUrl,
    // withCredentials: true
});

const handleRefreshToken = async () => {
    const res = await instance.get('/api/user/refresh');
    if (res && res.data) return res.data.access_token;
    else null;
};



instance.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('access_token') || '';
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
    return response.data && response?.data?.data ? response?.data?.data : response?.data;
}, async function (error) {

    return error.response?.data ?? Promise.reject(error);
});
export default instance;

// console.log(error);
    // if (
    //     error.config &&
    //     error.response &&
    //     +error.response.status === 401 &&
    //     !error.config.headers[NO_RETRY_HEADER]
    // ) {
    //     const access_token = await handleRefreshToken();
    //     error.config.headers[NO_RETRY_HEADER] = 'true';
    //     if (access_token) {
    //         error.config.headers['Authorization'] = `Bearer ${access_token}`;
    //         localStorage.setItem('access_token', access_token);
    //         return instance.request(error.config);
    //     }
    // }

    // if (
    //     error.config &&
    //     error.response &&
    //     +error.response.status === 400
    // ) {
    //     console.log(error);
    //     window.location.href = '/login';
    // }