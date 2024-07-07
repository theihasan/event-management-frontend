// Define the base URL constant
const BASE_URL = 'http://localhost:8000/api';

document.getElementById('loginButton').addEventListener('click', async () => {
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);

    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.removeItem('token');
            localStorage.setItem('token', data.access_token);
            window.location.href = 'index.html'; 
        } else {
            document.getElementById('error-message').textContent = data.message;
        }
    } catch (error) {
        document.getElementById('error-message').textContent = 'An unexpected error occurred.';
    }
});
