import loginReducer from "./redux/login";
import passwordReducer from "./redux/password";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        login: loginReducer,
        password: passwordReducer
    },
})

export default store;
export { store }; // For use in Util.js