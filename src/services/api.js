import axios from '../utils/axios';

export const callProduct = () => {
    return axios.get(`/api/product`);
};
