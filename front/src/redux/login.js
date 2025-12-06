import { createSlice } from '@reduxjs/toolkit';

export const loginReducer = createSlice({
    name: 'login',
    initialState: {
        value: null,
    },
    reducers: {
        setLogin: (state, action) => {
            state.value = action.payload;
        },
        resetLogin: (state) => {
            state.value = null;
        },
    },
})

export const {setLogin, resetLogin} = loginReducer.actions;

export default loginReducer.reducer;
