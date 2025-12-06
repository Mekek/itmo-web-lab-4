export async function autoFetch(url, method, body, disableAlert) {
    let res = { success: false };
    try {
        let raw = await fetch('http://localhost:8080/WebLab4/api/' + url, {
            method: method ? method : 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            credentials: 'include',
            body: body ? JSON.stringify(body) : undefined
        });
        res = await raw.json();
    } catch (e) {
        res.error = e.toString();
    }

    if (!res.success && !disableAlert) {
        // Instead of alert, we'll handle notification in components
        res.shouldShowNotification = true;
    }
    console.log(res);
    return res;
}