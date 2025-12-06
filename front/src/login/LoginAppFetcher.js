import LoginApp from "./LoginApp";
import {useState} from "react";
import {Navigate, useLoaderData} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {autoFetch} from "../Util";
import {setLogin} from "../redux/login";
import {setPassword} from "../redux/password";

function LoginAppFetcher(props) {
    let [redirect, redirectTo] = useState();
    const dispatch = useDispatch();

    const loaded = useLoaderData();
    if(loaded.success) redirect = '/main';

    const [login, setNewLogin] = useState('');
    const [password, setNewPassword] = useState('');

    function loginChangeHandle(ev) {setNewLogin(ev.target.value)}
    function passwordChangeHandle(ev) {setNewPassword(ev.target.value)}

    function loginHandle() {
        if(!login || !password) return;
        autoFetch('auth/login', 'POST', {login, password})
            .then(res => {
                if(res.success) {
                    dispatch(setLogin(login));
                    dispatch(setPassword(password));
                    redirectTo('/main');
                }
            });
    }

    function registerHandle() {
        if(!login || !password) return;
        autoFetch('auth/register', 'POST', {login, password})
            .then(res => {
                if(res.success) {
                    dispatch(setLogin(login));
                    dispatch(setPassword(password));
                    redirectTo('/main');
                }
            });
    }

    if(redirect) return (<Navigate to={`.${redirect}`} relative/>);

    return (<LoginApp fetcher={{loginChangeHandle, passwordChangeHandle, loginHandle, registerHandle}}/>);
}

export default LoginAppFetcher;

export async function getLogin() {
    return await autoFetch('auth', 'GET', undefined, true);
}
