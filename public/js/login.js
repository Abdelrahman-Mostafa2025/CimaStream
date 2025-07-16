import { url, showLoginError, showError, clearError } from './utils.js';
window.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm');
    const inputs = document.querySelectorAll('.validationCustom');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            loginValidateField(input);
        });
        input.addEventListener('input', () => {
            clearError(input);
        });
    });
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        inputs.forEach(input => {
            if (!loginValidateField(input)) {
                isValid = false;
            }
        });
        if (!isValid) {
            return;
        }
        let user = checkLoginData(inputs[0].value, inputs[1].value);
        console.log(user);
        if (!user) {
            showLoginError("Please fill in all fields correctly.");
            return;
        }
        user.then(foundUser => {
            console.log(foundUser);
            if (foundUser !== undefined) {
                handleLoginSuccess(foundUser);
            }
            else {
                console.log("User not found");
                showLoginError("Invalid email or password");
            }
        });
    });
});
function loginValidateField(input) {
    const value = input.value.trim();
    const id = input.id;
    if (value === '') {
        showError(input, 'This field is required');
        return false;
    }
    if (id === 'email') {
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailRegex.test(value)) {
            showError(input, 'Invalid email loginFormat');
            return false;
        }
    }
    if (id === 'password' && value.length < 8) {
        showError(input, 'Password should contain at least 8 characters');
        return false;
    }
    return true;
}
async function checkLoginData(email, password) {
    try {
        const response = await fetch(url);
        const users = await response.json();
        const foundUser = users.find(user => user.email === email && user.password === password);
        return foundUser;
    }
    catch (error) {
        showLoginError("An error occurred. Please try again.");
    }
}
function handleLoginSuccess(user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.replace("/public/pages/index.html");
}
