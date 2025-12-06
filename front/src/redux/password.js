import { createSlice } from '@reduxjs/toolkit';

export const passwordReducer = createSlice({
    name: 'password',
    initialState: {
        value: null,
    },
    reducers: {
        setPassword: (state, action) => {
            state.value = action.payload;
        },
        resetPassword: (state) => {
            state.value = null;
        },
    },
})

export const selectPassword = state => state.password.value;

export const {setPassword, resetPassword} = passwordReducer.actions;

export default passwordReducer.reducer;
