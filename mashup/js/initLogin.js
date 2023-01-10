async function checkLoggedIn() {
    return await fetch(`${tenant}/api/v1/users/me`, {
        mode: 'cors',
        credentials: 'include',
        headers: {
            'qlik-web-integration-id': `${webInt}`
        },
    })
}

async function login() {
    const authHeader = `Bearer ${token}`;
    console.log(authHeader);
    return await fetch(`${tenant}/login/jwt-session?qlik-web-integration-id=${webInt}`, {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        headers: {
            'Authorization': authHeader,
            'qlik-web-integration-id': `${webInt}`
        },
    })
}