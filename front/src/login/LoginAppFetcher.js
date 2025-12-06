import LoginApp from "./LoginApp";
import { useState } from "react";
import { Navigate, useLoaderData } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { autoFetch } from "../Util";
import { setLogin } from "../redux/login";
import { setPassword } from "../redux/password";
import { useNotification } from "../NotificationContext";

function LoginAppFetcher(props) {
    let [redirect, redirectTo] = useState();
    const dispatch = useDispatch();
    const { showNotification } = useNotification();

    const loaded = useLoaderData();
    if (loaded.success) redirect = '/main';

    const [login, setNewLogin] = useState('');
    const [password, setNewPassword] = useState('');

    function loginChangeHandle(ev) { setNewLogin(ev.target.value) }
    function passwordChangeHandle(ev) { setNewPassword(ev.target.value) }

    function loginHandle() {
        if (!login || !password) {
            showNotification('Please enter both login and password');
            return;
        }
        autoFetch('auth/login', 'POST', { login, password })
            .then(res => {
                if (res.success) {
                    dispatch(setLogin(login));
                    dispatch(setPassword(password));
                    redirectTo('/main');
                } else if (res.shouldShowNotification) {
                    showNotification(res.error || 'Login failed');
                }
            });
    }

    function registerHandle() {
        if (!login || !password) {
            showNotification('Please enter both login and password');
            return;
        }
        autoFetch('auth/register', 'POST', { login, password })
            .then(res => {
                if (res.success) {
                    dispatch(setLogin(login));
                    dispatch(setPassword(password));
                    redirectTo('/main');
                } else if (res.shouldShowNotification) {
                    showNotification(res.error || 'Registration failed');
                }
            });
    }

    if (redirect) return (<Navigate to={`.${redirect}`} relative />);

    return (<LoginApp fetcher={{ loginChangeHandle, passwordChangeHandle, loginHandle, registerHandle }} />);
}

export default LoginAppFetcher;

export async function getLogin() {
    return await autoFetch('auth', 'GET', undefined, true);
}