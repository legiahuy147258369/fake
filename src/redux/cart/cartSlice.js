import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
const initialState = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let cart = state.cart;
            const { detail, qty } = action.payload;
            const index = cart.findIndex(item => item.detail.id === detail.id);
            if (index > -1) {
                cart[index].qty = cart[index].qty + qty;
            } else {
                cart.push({ qty: qty, detail: detail });
            }
            state.cart = cart;
            message.success('Sản phẩm đã được thêm vào giỏ hàng');
        },
        updateCart: (state, action) => {
            let cart = state.cart;
            const item = action.payload;
            let index = cart.findIndex((ele) => ele.detail.id === item.id);
            if (index > -1) {
                cart[index].qty = item.qty;
            }
            state.cart = cart;
        },
        delIdCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.detail.id !== action.payload.id);
        },
        delAllCart: (state, action) => {
            state.cart = []
        }
    },
})

export const { addToCart, delIdCart, updateCart, delAllCart } = cartSlice.actions

export default cartSlice.reducer;