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
export const callTopNew = () => {
    return axios.get(`/api/product/topnew`);
};
export const callCategory = () => {
    return axios.get(`/api/category`);
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
export const callProductPagination = (query) => {
    const queryParams = { ...query };
    return axios.get('/api/product', { params: queryParams });
};

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