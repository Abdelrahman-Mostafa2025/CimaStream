export const url = 'http://localhost:3000/users';
export function showLoginError(message) {
    const errorBox = document.querySelector('#loginError');
    if (errorBox) {
        errorBox.innerText = message;
        errorBox.classList.remove('d-none');
    }
}
export function showError(input, message) {
    clearError(input);
    const error = document.createElement('p');
    error.className = 'error-message';
    error.textContent = message;
    input.style.border = '1px solid red';
    if (!input.nextElementSibling ||
        !input.nextElementSibling.classList.contains('error-message')) {
        input.parentNode?.insertBefore(error, input.nextSibling);
    }
}
export function clearError(input) {
    const inputWrapper = input;
    inputWrapper.style.border = '';
    const next = inputWrapper.nextElementSibling;
    if (next && next.classList.contains('error-message')) {
        next.remove();
    }
}
