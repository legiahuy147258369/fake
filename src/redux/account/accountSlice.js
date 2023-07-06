import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        email: '',
        phone: '',
        name: '',
        role: '',
        avatar: '',
        address: '',
        id: '',
    },
    status: 'idle',
};

export const accountSlide = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        getAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload.user;
        },
        doLogoutAction: (state, action) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.user = {
                email: '',
                phone: '',
                fullName: '',
                role: '',
                avatar: '',
                id: '',
            };
        },
        doUpdateUserInfoAction: (state, action) => {
            state.user.avatar = action.payload.avatar;
            state.user.phone = action.payload.phone;
            state.user.fullName = action.payload.fullName;
        },
        doUpdateAvatarAction: (state, action) => {
            state.tempAvatar = action.payload.avatar;
        },
    },

    extraReducers: (builder) => { },
});

export const { doLoginAction, getAccountAction, doLogoutAction, doUpdateUserInfoAction, doUpdateAvatarAction } =
    accountSlide.actions;

export default accountSlide.reducer;