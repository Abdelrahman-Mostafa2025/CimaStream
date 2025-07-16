import { url, showLoginError, showError, clearError } from './utils.js';
window.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#registerForm');
    const inputs = document.querySelectorAll('.validationCustom');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            registerValidateField(input);
        });
        input.addEventListener('input', () => {
            clearError(input);
        });
    });
    registerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        inputs.forEach(input => {
            if (!registerValidateField(input)) {
                isValid = false;
            }
        });
        if (!isValid) {
            return;
        }
        saveUSerData(inputs);
    });
});
function registerValidateField(input) {
    const value = input.value.trim();
    const id = input.id;
    if (value === '') {
        showError(input, 'This field is required');
        return false;
    }
    if (id === 'validationCustom01' || id === 'validationCustom02') {
        const nameRegex = /^[A-Za-z]+$/;
        if (!nameRegex.test(value)) {
            showError(input, 'Name should contain only letters');
            return false;
        }
    }
    if (id === 'validationCustom03') {
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailRegex.test(value)) {
            showError(input, 'Invalid email registerFormat');
            return false;
        }
    }
    if (id === 'validationCustom04' && value.length < 8) {
        showError(input, 'Password should contain at least 8 characters');
        return false;
    }
    if (id === 'validationCustom05') {
        const passwordInput = document.getElementById('validationCustom04');
        if (passwordInput && value !== passwordInput.value) {
            showError(input, 'Passwords do not match');
            return false;
        }
    }
    return true;
}
async function saveUSerData(inputs) {
    const fName = document.getElementById('validationCustom01').value.trim();
    const lName = document.getElementById('validationCustom02').value.trim();
    const email = document.getElementById('validationCustom03').value.trim();
    const password = document.getElementById('validationCustom04').value.trim();
    let name = fName + lName;
    const newUser = {
        id: Date.now(),
        name,
        email,
        password
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        if (!response.ok) {
            throw new Error('Failed to register user');
        }
        window.location.href = '/public/pages/login.html';
    }
    catch (error) {
        showLoginError('Registration failed. Please try again.');
    }
}
