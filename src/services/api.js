import axios from '../utils/axios';

export const callProduct = () => {
    return axios.get(`/api/product`);
};
export const callBanner = () => {
    return axios.get(`/api/product/banner`);
};
export const callTopView = () => {
    return axios.get(`/api/product/topview`);
};
export const callTopSold = () => {
    return axios.get(`/api/product/top_sold`);
};
export const callTopNew = () => {
    return axios.get(`/api/product/topnew`);
};
export const callCategory = () => {
    return axios.get(`/api/category`);
};
export const callChartPieProduct = () => {
    return axios.get(`/api/category/chart/pie`);
};
export const callProductDetail = (id) => {
    return axios.get(`/api/product/detail/${id}`);
};
export const callRegister = (data) => {
    return axios.post(`/api/user/register`, { ...data });
};
export const callLogin = (data) => {
    return axios.post(`/api/user/login`, { ...data });
};
export const callFetchAccount = () => {
    return axios.get('/api/user/account');
};
export const callLogout = () => {
    return axios.get('/api/user/logout');
};
export const callAllOrder = () => {
    return axios.get('/api/order/');
};
export const callUpdateCurrent = (body) => {
    return axios.put('/api/user/current', body);
};
export const callUpdateCurrentPass = (body) => {
    return axios.put('/api/user/current/pass', body);
};
export const callUploadAvatar = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', fileImg);
    return axios({
        method: 'put',
        url: '/api/user/current/avatar',
        data: bodyFormData,
        headers: {
            'Content-Type': 'multipart/form-data',
            'upload-type': 'avatar',
        },
    });
};
export const callCreateProduct = (data) => {
    return axios({
        method: 'post',
        url: '/api/product',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
export const callProductPagination = (query) => {
    const queryParams = { ...query };
    console.log(queryParams);
    return axios.get('/api/product', { params: queryParams });
};
export const callComments = async (re) => {
    const params = new URLSearchParams(re);
    const url = `/api/comment?${params}`;
    return axios.get(url);
}
export const callTinh = async () => {
    const res = await fetch('https://provinces.open-api.vn/api/');
    return await res.json();
}
export const callHuyen = async (ip) => {
    const res = await fetch(`https://provinces.open-api.vn/api/p/${ip}?depth=2`);
    return await res.json();
}
export const callCreateOrder = (data) => {
    return axios.post('/api/order', { ...data });
};
export const callCreateComment = (data) => {
    return axios.post(`/api/comment`, data);
};
export const callLike = (data) => {
    return axios.post(`/api/comment/like`, data);
};
export const callPaypal = (orders) => {
    return axios.post(`/api/order/paypal`, orders);
};
export const callCapture = (orderID) => {
    return axios.post(`/api/order/capture`, { orderID });
};