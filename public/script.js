document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button');
    const profileDiv = document.getElementById('profile');
    const profileInfo = document.getElementById('profile-info');

    const API_URL = 'http://localhost:4000';

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            loginForm.style.display = 'none';
            logoutButton.style.display = 'block';
            getProfile();
        } else {
            alert('Invalid credentials');
        }
    });

    logoutButton.addEventListener('click', async () => {
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST'
        });

        if (response.ok) {
            loginForm.style.display = 'flex';
            logoutButton.style.display = 'none';
            profileDiv.style.display = 'none';
            profileInfo.textContent = '';
        } else {
            alert('Logout failed');
        }
    });

    const getProfile = async () => {
        const response = await fetch(`${API_URL}/profile`);
        if (response.ok) {
            const data = await response.json();
            profileDiv.style.display = 'block';
            profileInfo.textContent = `Username: ${data.user.username}`;
        } else {
            alert('Unauthorized');
        }
    };
});


