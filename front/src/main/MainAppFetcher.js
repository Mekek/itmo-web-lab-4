import { useState, useEffect } from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import { autoFetch } from "../Util";
import MainAppModed from "./MainAppModed";
import { useDispatch } from "react-redux";
import { resetLogin } from "../redux/login";
import { resetPassword } from "../redux/password";
import store from "../store";
import { useNotification } from "../NotificationContext";

function MainAppFetcher(props) {
    let [redirect, redirectTo] = useState();
    const dispatch = useDispatch();
    const { showNotification } = useNotification();

    const loaded = useLoaderData();

    // Используем useEffect для обработки редиректа один раз
    useEffect(() => {
        if (!loaded.success && !loaded.login) {
            redirectTo('/');
            // Показываем уведомление только если это не первый заход
            if (loaded.shouldShowNotification) {
                showNotification('You are not logged in. Please log in first.');
            }
        }
    }, [loaded, showNotification]);

    const login = store.getState().login.value;

    const [x, setX] = useState();
    const [y, setY] = useState();
    const [r, setR] = useState();
    const [results, setResults] = useState(loaded.data || []);

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
                else if (!res.login && res.shouldShowNotification) {
                    showNotification(res.error || 'Failed to clear results');
                }
            });
    }

    function handleLogout() {
        autoFetch('auth/logout', 'POST')
            .then(res => {
                if (res.success) {
                    dispatch(resetLogin());
                    dispatch(resetPassword());
                    redirectTo('/');
                } else if (res.shouldShowNotification) {
                    showNotification(res.error || 'Logout failed');
                }
            });
    }

    async function checkHit(x, y) {
        if (x === undefined) {
            showNotification("X value is undefined");
            return;
        }
        if (y === undefined || Number.isNaN(y)) {
            showNotification("Y value is undefined or incorrect");
            return;
        }
        if (r === undefined) {
            showNotification("R value is undefined");
            return;
        }

        if (!(x >= -5 && x <= 3)) {
            showNotification("X value is not in [-5; 3]");
            return;
        }

        if (!(y >= -3 && y <= 5)) {
            showNotification("Y value is not in [-3; 5]");
            return;
        }

        if (!(r > 0 && r <= 3)) {
            showNotification("R value is not in (0; 3]");
            return;
        }

        let res = await autoFetch('check', 'POST', { x, y, r });

        if (res.success) setResults([...results, res.data]);
        else if (!res.login && res.shouldShowNotification) {
            showNotification(res.error || 'Failed to check hit');
        }
    }

    if (redirect) return (<Navigate to={`..${redirect}`} relative />);
    return (<MainAppModed fetcher={{ r, results, handleX, handleY, handleR, handleSubmit, handleClear, handleGraphClick, handleLogout, login }} />);
}

export async function LoadResults() {
    return await autoFetch('results');
}

export default MainAppFetcher;