const BASE_URL = 'http://localhost:8000/api';

document.getElementById('registerButton').addEventListener('click', async (event) => {
    event.preventDefault();
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    const password = document.getElementById('password').value;
    const passwordConfirmation = document.getElementById('password_confirmation').value;

    if (password !== passwordConfirmation) {
        document.getElementById('error-message').textContent = 'Passwords do not match.';
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.removeItem('token');
            localStorage.setItem('token', data.access_token);
            window.location.href = 'index.html';
        } else {
            document.getElementById('error-message').textContent = data.message || 'Registration failed.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'An unexpected error occurred.';
    }
});
