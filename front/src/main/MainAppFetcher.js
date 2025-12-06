import {useState} from "react";
import {Navigate, useLoaderData} from "react-router-dom";
import {autoFetch} from "../Util";
import MainAppModed from "./MainAppModed";
import {useDispatch} from "react-redux";
import {resetLogin} from "../redux/login";
import {resetPassword} from "../redux/password";
import store from "../store";

function MainAppFetcher(props) {
    let [redirect, redirectTo] = useState();
    const dispatch = useDispatch();

    const loaded = useLoaderData();
    if(!loaded.success && !loaded.login) redirect = '/';
    //const login = loaded.login;
    const login = store.getState().login.value;

    const [x, setX] = useState();
    const [y, setY] = useState();
    const [r, setR] = useState();
    const [results, setResults] = useState(loaded.data);

    function handleX(value) {
        setX(+value);
    }

    function handleY(value) {
        setY(+value);
    }

    function handleR(value) {
        setR(+value);
    }

    function handleSubmit() {
        checkHit(x, y);
    }

    function handleGraphClick(ev) {
        checkHit(+ev.x, +ev.y);
    }

    function handleClear() {
        autoFetch('clear')
            .then(res => {
                if (res.success) setResults([]);
                else if (!res.login) redirectTo('/');
            });
    }

    function handleLogout() {
        autoFetch('auth/logout', 'POST')
            .then(res => {
                if (!res.login) {
                    dispatch(resetLogin());
                    dispatch(resetPassword());
                    redirectTo('/');
                }
            });
    }

    async function checkHit(x, y) {
        if (x === undefined) return alert("X value is undefined");
        if (y === undefined || Number.isNaN(y)) return alert("Y value is undefined or incorrect");
        if (r === undefined) return alert("R value is undefined");
        if (!(x >= -4 && x <= 4)) return alert("X value is not in [-4; 4]");
        if (!(y >= -3 && y <= 5)) return alert("Y value is not in [-3; 5]");
        if (!(r > 0 && r <= 4)) return alert("R value is not in (0; 4]");

        let res = await autoFetch('check',
            'POST', {x, y, r});

        if (res.success) setResults([...results, res.data]);
        else if (!res.login) redirectTo('/');
    }

    if (redirect) return (<Navigate to={`..${redirect}`} relative/>);
    return (<MainAppModed fetcher={{r, results, handleX, handleY, handleR, handleSubmit, handleClear, handleGraphClick, handleLogout, login}}/>);

}

export async function LoadResults() {
    return await autoFetch('results');
}

export default MainAppFetcher;