import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import Routed from "./router";
import store from "./store";
import { Provider } from "react-redux";
import { NotificationProvider } from "./NotificationContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <NotificationProvider>
            <Routed />
        </NotificationProvider>
    </Provider>
);