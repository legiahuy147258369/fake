import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
const initialState = {
    product: []
}

export const wishSlide = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            const index = state.product.findIndex(item => item.id === action.payload.id);

            if (index > -1) {
                message.warning('Sản phẩm đã có trong danh sách');
            } else {
                state.product.push(action.payload)
                message.success('Sản phẩm đã được thêm vào giỏ hàng');
            }
        },
        delIdWishList: (state, action) => {
            console.log(action.payload);
            state.product = state.product.filter((item) => item.id !== action.payload);
        },
        delAllWishList: (state, action) => {
            state.product = [];
        }
    },
})

export const { addToWishList, delIdWishList, delAllWishList } = wishSlide.actions

export default wishSlide.reducer;